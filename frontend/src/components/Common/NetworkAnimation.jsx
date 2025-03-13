import React, { useEffect, useRef, useState } from 'react';

const NetworkAnimation = ({ opacity = 0.2, color = '20, 184, 166', zIndex = 0 }) => {
    const canvasRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if canvas is available
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId;
        let lastFrameTime = 0;
        let lastNodeAddTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        // Detect mobile device
        const checkMobile = () => {
            const isMobileView = window.innerWidth < 768;
            setIsMobile(isMobileView);
            return isMobileView;
        };

        const mobile = checkMobile();

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            const dpr = mobile ? Math.min(window.devicePixelRatio || 1, 2) : (window.devicePixelRatio || 1);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;

            ctx.scale(dpr, dpr);

            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            checkMobile();

            // Redistribute existing nodes when resizing
            if (nodes && nodes.length) {
                repositionNodes();
            }
        };

        // Calculate final node count based on screen size
        const calculateMaxNodeCount = () => {
            const area = window.innerWidth * window.innerHeight;
            const baseDensity = 0.00004;
            const count = Math.floor(area * baseDensity);
            return Math.max(8, Math.min(30, count));
        };

        // Calculate connection distance based on screen size
        const calculateConnectionDistance = () => {
            const minDimension = Math.min(window.innerWidth, window.innerHeight);
            return Math.min(mobile ? 180 : 300, minDimension * (mobile ? 0.25 : 0.25));
        };

        // Node configuration
        const maxNodeCount = calculateMaxNodeCount();
        const connectionDistance = calculateConnectionDistance();
        const nodes = [];
        const dataPackets = [];

        // Create a node at a random position
        const createNode = () => {
            // Calculate appropriate speed factor based on screen size
            const speedFactor = Math.min(window.innerWidth, window.innerHeight) / (mobile ? 1600 : 1000);

            // Place node at edge of screen with some randomization
            let x, y;
            const side = Math.floor(Math.random() * 4);

            if (side === 0) { // top
                x = Math.random() * window.innerWidth;
                y = -20;
            } else if (side === 1) { // right
                x = window.innerWidth + 20;
                y = Math.random() * window.innerHeight;
            } else if (side === 2) { // bottom
                x = Math.random() * window.innerWidth;
                y = window.innerHeight + 20;
            } else { // left
                x = -20;
                y = Math.random() * window.innerHeight;
            }

            // Create target destination somewhere in the viewport
            const targetX = 50 + Math.random() * (window.innerWidth - 100);
            const targetY = 50 + Math.random() * (window.innerHeight - 100);

            // Calculate velocity vector toward center of screen
            const dx = targetX - x;
            const dy = targetY - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            const node = {
                x,
                y,
                radius: mobile ? (Math.random() * 1.2 + 1.2) : (Math.random() * 1.5 + 1.5),
                vx: (dx / dist) * speedFactor * (0.5 + Math.random() * 0.5),
                vy: (dy / dist) * speedFactor * (0.5 + Math.random() * 0.5),
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: mobile ? (0.02 + Math.random() * 0.01) : (0.03 + Math.random() * 0.02),
                targetX,
                targetY,
                driftCorrectionFactor: mobile ? 0.004 : 0.002,
                age: 0,
                wanderPhase: Math.random() * Math.PI * 2,
                wanderSpeed: 0.02 + Math.random() * 0.01,
                wanderMagnitude: 0.1 + Math.random() * 0.2,
                id: Math.random().toString(36).substr(2, 9) // Add unique ID for nodes
            };

            nodes.push(node);
        };

        // Initialize with a few nodes
        const initializeNodes = () => {
            const initialCount = Math.max(3, Math.floor(maxNodeCount * 0.3));
            for (let i = 0; i < initialCount; i++) {
                createNode();
            }
        };

        // Reposition nodes with better distribution on resize
        const repositionNodes = () => {
            nodes.forEach(node => {
                // Keep nodes within the visible area after resize
                node.x = Math.min(Math.max(node.x, 0), window.innerWidth);
                node.y = Math.min(Math.max(node.y, 0), window.innerHeight);

                // Assign new target positions
                node.targetX = 50 + Math.random() * (window.innerWidth - 100);
                node.targetY = 50 + Math.random() * (window.innerHeight - 100);
            });
        };

        window.addEventListener('resize', setCanvasDimensions);
        setCanvasDimensions();
        initializeNodes();

        // Animation function with dynamic node generation
        const animate = (timestamp) => {
            if (!canvas || !ctx) return;

            // Frame rate throttling for mobile
            const elapsed = timestamp - lastFrameTime;
            if (mobile && elapsed < frameInterval) {
                animationFrameId = window.requestAnimationFrame(animate);
                return;
            }

            lastFrameTime = timestamp;

            // Add new nodes over time until we reach the max
            if (nodes.length < maxNodeCount && timestamp - lastNodeAddTime > (mobile ? 2000 : 1500)) {
                createNode();
                lastNodeAddTime = timestamp;
            }

            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            // Track active connections for drawing packets along them later
            const activeConnections = [];

            // Update and draw nodes
            for (let i = nodes.length - 1; i >= 0; i--) {
                const node = nodes[i];

                // Update node age
                node.age += 1;

                // Apply wandering behavior for more natural movement
                node.wanderPhase += node.wanderSpeed;

                // Calculate wandering force
                const wanderX = Math.cos(node.wanderPhase) * node.wanderMagnitude;
                const wanderY = Math.sin(node.wanderPhase) * node.wanderMagnitude;

                // Move node
                node.x += node.vx + wanderX;
                node.y += node.vy + wanderY;

                // Apply gentle drag to slow down over time
                node.vx *= 0.99;
                node.vy *= 0.99;

                // Bounce off walls with energy loss
                if (node.x < 0 || node.x > window.innerWidth) {
                    node.vx *= -0.9;
                    node.x = node.x < 0 ? 0 : window.innerWidth;
                }
                if (node.y < 0 || node.y > window.innerHeight) {
                    node.vy *= -0.9;
                    node.y = node.y < 0 ? 0 : window.innerHeight;
                }

                // Apply drift correction to gradually move towards target position
                const dxTarget = node.targetX - node.x;
                const dyTarget = node.targetY - node.y;

                // Stronger correction when far from target
                const distToTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);
                const correction = node.driftCorrectionFactor * (1 + distToTarget / 300);

                node.vx += dxTarget * correction;
                node.vy += dyTarget * correction;

                // Occasionally update target position for continuous movement
                if (Math.random() < 0.002) {
                    node.targetX = 50 + Math.random() * (window.innerWidth - 100);
                    node.targetY = 50 + Math.random() * (window.innerHeight - 100);
                }

                // Lower max speed for stability
                const maxSpeed = mobile ? 0.7 : 1.0;
                const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
                if (currentSpeed > maxSpeed) {
                    node.vx = (node.vx / currentSpeed) * maxSpeed;
                    node.vy = (node.vy / currentSpeed) * maxSpeed;
                }

                // Update pulse
                node.pulsePhase += node.pulseSpeed;
                const pulseFactor = 0.5 + 0.5 * Math.sin(node.pulsePhase);

                // Adjust size for better visibility
                const sizeFactor = mobile ?
                    Math.min(1.5, Math.min(window.innerWidth, window.innerHeight) / 500) :
                    Math.min(1.2, Math.min(window.innerWidth, window.innerHeight) / 800);
                const adjustedRadius = node.radius * sizeFactor;

                const pulseRange = mobile ? (2 + pulseFactor) : (2.5 + pulseFactor);

                // Fade in effect for new nodes
                const fadeInOpacity = Math.min(1, node.age / 30);

                // Draw node with optimized gradient
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, adjustedRadius * pulseRange
                );

                gradient.addColorStop(0, `rgba(${color}, ${fadeInOpacity})`);
                gradient.addColorStop(0.5, `rgba(${color}, ${0.5 * fadeInOpacity})`);
                gradient.addColorStop(1, `rgba(${color}, 0)`);

                ctx.beginPath();
                ctx.arc(node.x, node.y, adjustedRadius * pulseRange, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw connections
                const maxConnections = mobile ? 4 : 6;
                let connectionCount = 0;

                for (let j = 0; j < nodes.length; j++) {
                    if (i === j) continue;

                    const otherNode = nodes[j];
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance && connectionCount < maxConnections) {
                        connectionCount++;

                        // Combine fade-in effects of both nodes
                        const otherFadeIn = Math.min(1, otherNode.age / 30);
                        const combinedOpacity = fadeInOpacity * otherFadeIn;

                        // Improved opacity calculation for visibility
                        const opacity = mobile ?
                            (1.2 - (distance / connectionDistance)) * combinedOpacity :
                            (1.0 - (distance / connectionDistance)) * combinedOpacity;

                        // Draw connection line
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(${color}, ${opacity * (mobile ? 0.6 : 0.4)})`;
                        ctx.lineWidth = mobile ?
                            Math.max(0.8, 2.0 * sizeFactor) :
                            Math.max(0.5, 1.5 * sizeFactor);
                        ctx.stroke();

                        // Store active connection for data packets
                        activeConnections.push({
                            fromNode: node,
                            toNode: otherNode,
                            distance: distance,
                            opacity: opacity,
                            combinedOpacity: combinedOpacity,
                            connectionKey: `${node.id}-${otherNode.id}`
                        });

                        // Create data packets with optimized probability
                        // Note: We only create packets, their rendering is based on active connections
                        const packetProbability = mobile ? 0.0008 : 0.001;
                        if (Math.random() < packetProbability && distance > 50) {
                            const connectionKey = `${node.id}-${otherNode.id}`;
                            dataPackets.push({
                                connectionKey: connectionKey, // Track which connection this packet belongs to
                                fromNodeId: node.id,
                                toNodeId: otherNode.id,
                                startX: node.x,
                                startY: node.y,
                                endX: otherNode.x,
                                endY: otherNode.y,
                                progress: 0,
                                speed: mobile ? (0.01 + Math.random() * 0.008) : (0.01 + Math.random() * 0.01),
                                size: mobile ?
                                    (2.0 + Math.random() * 2.0) * sizeFactor :
                                    (1.5 + Math.random() * 1.5) * sizeFactor,
                                opacity: combinedOpacity
                            });
                        }
                    }
                }
            }

            // Create lookup map of active connections for quick reference
            const activeConnectionMap = {};
            activeConnections.forEach(conn => {
                activeConnectionMap[conn.connectionKey] = conn;
                // Also add the reverse direction as connections are bidirectional
                activeConnectionMap[`${conn.toNode.id}-${conn.fromNode.id}`] = {
                    ...conn,
                    fromNode: conn.toNode,
                    toNode: conn.fromNode,
                    connectionKey: `${conn.toNode.id}-${conn.fromNode.id}`
                };
            });

            // Update and draw data packets
            for (let i = dataPackets.length - 1; i >= 0; i--) {
                const packet = dataPackets[i];
                packet.progress += packet.speed;

                if (packet.progress >= 1) {
                    dataPackets.splice(i, 1);
                    continue;
                }

                // Check if this connection is still active
                const activeConn = activeConnectionMap[packet.connectionKey];
                if (!activeConn) {
                    // Connection no longer exists, remove the packet
                    dataPackets.splice(i, 1);
                    continue;
                }

                // Update packet position based on current node positions
                // This ensures packets always follow the current line path
                const fromNode = activeConn.fromNode;
                const toNode = activeConn.toNode;

                // Calculate current position along the line between current node positions
                const currentX = fromNode.x + (toNode.x - fromNode.x) * packet.progress;
                const currentY = fromNode.y + (toNode.y - fromNode.y) * packet.progress;

                // Draw packet glow
                const packetGlow = ctx.createRadialGradient(
                    currentX, currentY, 0,
                    currentX, currentY, packet.size * (mobile ? 4 : 3)
                );

                packetGlow.addColorStop(0, `rgba(${color}, ${packet.opacity})`);
                packetGlow.addColorStop(0.3, `rgba(${color}, ${0.8 * packet.opacity})`);
                packetGlow.addColorStop(1, `rgba(${color}, 0)`);

                ctx.beginPath();
                ctx.arc(currentX, currentY, packet.size, 0, Math.PI * 2);
                ctx.fillStyle = packetGlow;
                ctx.fill();

                // Brighter center
                ctx.beginPath();
                ctx.arc(currentX, currentY, packet.size * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${packet.opacity})`;
                ctx.fill();
            }

            animationFrameId = window.requestAnimationFrame(animate);
        };

        // Start animation
        animationFrameId = window.requestAnimationFrame(animate);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [color, opacity]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{
                opacity,
                zIndex,
                pointerEvents: 'none'
            }}
        />
    );
};

export default NetworkAnimation;
