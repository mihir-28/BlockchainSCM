import React, { useEffect, useRef } from 'react';

const NetworkAnimation = ({ opacity = 0.2, color = '20, 184, 166', zIndex = 0 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Check if canvas is available
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        let animationFrameId;

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            // Get actual screen dimensions
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Redistribute nodes when resizing
            if (nodes && nodes.length) {
                repositionNodes();
            }
        };

        // Calculate appropriate node count based on screen size
        const calculateNodeCount = () => {
            const area = window.innerWidth * window.innerHeight;
            // Lower density for better performance
            const baseDensity = 0.00004; 
            return Math.max(6, Math.min(25, Math.floor(area * baseDensity)));
        };

        // Calculate connection distance based on screen size
        const calculateConnectionDistance = () => {
            const minDimension = Math.min(window.innerWidth, window.innerHeight);
            return Math.min(300, minDimension * 0.25);
        };

        // Node configuration
        const nodeCount = calculateNodeCount();
        const connectionDistance = calculateConnectionDistance();
        const nodes = [];
        const dataPackets = [];
        
        // Create initial nodes with better distribution
        const initializeNodes = () => {
            // Use fewer columns and rows for better spreading
            const cols = Math.ceil(Math.sqrt(nodeCount * 1.5));
            const rows = Math.ceil(nodeCount / cols);
            const cellWidth = window.innerWidth / cols;
            const cellHeight = window.innerHeight / rows;
            
            let count = 0;
            for (let i = 0; i < rows && count < nodeCount; i++) {
                for (let j = 0; j < cols && count < nodeCount; j++) {
                    // More randomization within cell
                    const x = j * cellWidth + cellWidth * (0.2 + Math.random() * 0.6);
                    const y = i * cellHeight + cellHeight * (0.2 + Math.random() * 0.6);
                    
                    // Lower base speed for stability
                    const speedFactor = Math.min(window.innerWidth, window.innerHeight) / 1200;
                    
                    nodes.push({
                        x,
                        y,
                        radius: Math.random() * 1.5 + 1.5,
                        vx: (Math.random() - 0.5) * 0.5 * speedFactor,
                        vy: (Math.random() - 0.5) * 0.5 * speedFactor,
                        pulsePhase: Math.random() * Math.PI * 2,
                        pulseSpeed: 0.03 + Math.random() * 0.02,
                        // Stronger drift correction
                        targetX: x,
                        targetY: y,
                        driftCorrectionFactor: 0.002
                    });
                    count++;
                }
            }
        };
        
        // Reposition nodes with better distribution
        const repositionNodes = () => {
            const cols = Math.ceil(Math.sqrt(nodes.length * 1.5));
            const rows = Math.ceil(nodes.length / cols);
            const cellWidth = window.innerWidth / cols;
            const cellHeight = window.innerHeight / rows;
            
            nodes.forEach((node, index) => {
                const i = Math.floor(index / cols);
                const j = index % cols;
                
                // Update target positions with more randomization
                node.targetX = j * cellWidth + cellWidth * (0.2 + Math.random() * 0.6);
                node.targetY = i * cellHeight + cellHeight * (0.2 + Math.random() * 0.6);
                
                // Keep current position but update speed
                const speedFactor = Math.min(window.innerWidth, window.innerHeight) / 1200;
                node.vx = (Math.random() - 0.5) * 0.5 * speedFactor;
                node.vy = (Math.random() - 0.5) * 0.5 * speedFactor;
            });
        };

        window.addEventListener('resize', setCanvasDimensions);
        setCanvasDimensions();
        initializeNodes();

        // Animation function
        const animate = () => {
            if (!canvas || !ctx) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach((node, i) => {
                // Move node
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off walls with energy loss
                if (node.x < 0 || node.x > canvas.width) {
                    node.vx *= -0.9;
                    node.x = node.x < 0 ? 0 : canvas.width;
                }
                if (node.y < 0 || node.y > canvas.height) {
                    node.vy *= -0.9;
                    node.y = node.y < 0 ? 0 : canvas.height;
                }
                
                // Apply stronger drift correction
                const dxTarget = node.targetX - node.x;
                const dyTarget = node.targetY - node.y;
                node.vx += dxTarget * node.driftCorrectionFactor;
                node.vy += dyTarget * node.driftCorrectionFactor;
                
                // Lower max speed for stability
                const maxSpeed = 1.0;
                const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
                if (currentSpeed > maxSpeed) {
                    node.vx = (node.vx / currentSpeed) * maxSpeed;
                    node.vy = (node.vy / currentSpeed) * maxSpeed;
                }

                // Update pulse
                node.pulsePhase += node.pulseSpeed;
                const pulseFactor = 0.5 + 0.5 * Math.sin(node.pulsePhase);

                // Adjust size for better visibility on mobile
                const sizeFactor = Math.min(1.2, Math.min(window.innerWidth, window.innerHeight) / 800);
                const adjustedRadius = node.radius * sizeFactor;

                // Draw node
                const gradient = ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, adjustedRadius * (2.5 + pulseFactor)
                );

                gradient.addColorStop(0, `rgba(${color}, 1)`);
                gradient.addColorStop(0.5, `rgba(${color}, 0.5)`);
                gradient.addColorStop(1, `rgba(${color}, 0)`);

                ctx.beginPath();
                ctx.arc(node.x, node.y, adjustedRadius * (2.5 + pulseFactor), 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw connections between nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const otherNode = nodes[j];
                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        // Higher base opacity for better visibility
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = `rgba(${color}, ${opacity * 0.4})`;
                        ctx.lineWidth = Math.max(0.5, 1.5 * sizeFactor);
                        ctx.stroke();

                        // Create new data packet with lower probability
                        const packetProbability = window.innerWidth < 768 ? 0.0005 : 0.001;
                        if (Math.random() < packetProbability) {
                            dataPackets.push({
                                startX: node.x,
                                startY: node.y,
                                endX: otherNode.x,
                                endY: otherNode.y,
                                progress: 0,
                                speed: 0.01 + Math.random() * 0.01,
                                size: (1.5 + Math.random() * 1.5) * sizeFactor
                            });
                        }
                    }
                }
            });

            // Update and draw data packets
            for (let i = dataPackets.length - 1; i >= 0; i--) {
                const packet = dataPackets[i];
                packet.progress += packet.speed;
                
                if (packet.progress >= 1) {
                    dataPackets.splice(i, 1);
                    continue;
                }

                const currentX = packet.startX + (packet.endX - packet.startX) * packet.progress;
                const currentY = packet.startY + (packet.endY - packet.startY) * packet.progress;

                const packetGlow = ctx.createRadialGradient(
                    currentX, currentY, 0,
                    currentX, currentY, packet.size * 3
                );

                packetGlow.addColorStop(0, `rgba(${color}, 1)`);
                packetGlow.addColorStop(0.3, `rgba(${color}, 0.7)`);
                packetGlow.addColorStop(1, `rgba(${color}, 0)`);

                ctx.beginPath();
                ctx.arc(currentX, currentY, packet.size, 0, Math.PI * 2);
                ctx.fillStyle = packetGlow;
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(currentX, currentY, packet.size * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
                ctx.fill();
            }

            animationFrameId = window.requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Cleanup function
        return () => {
            window.removeEventListener('resize', setCanvasDimensions);
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ 
                opacity, 
                zIndex,
                pointerEvents: 'none' // Ensure canvas doesn't block interactions
            }}
        />
    );
};

export default NetworkAnimation;