import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Reveal = ({
	children,
	className,
	delay = 0,
	stagger = false,
	staggerDelay = 0.1,
	duration = 0.6,
	index = 0,
	direction = "up",
	distance = 50,
	hover = false,
	hoverY = -5,
	hoverX = 0,
	hoverScale = 1,
	hoverRotate = 0,
	hoverDuration = 0.1,

	hoverType = "lift", // "lift", "scale", "rotate", "slideRight", "slideLeft", "custom"
}) => {
	const ref = useRef(null);

	const isInView = useInView(ref, { once: true, amount: 0.5 });

	const calculatedDelay = stagger ? delay + index * staggerDelay : delay;

	const getInitial = () => {
		switch (direction) {
			case "left":
				return { opacity: 0, x: -distance };
			case "right":
				return { opacity: 0, x: distance };
			case "down":
				return { opacity: 0, y: -distance };
			case "fade":
				return { opacity: 0, y: 0 };
			case "up":
			default:
				return { opacity: 0, y: distance };
		}
	};

	// Get hover animation based on type
	const getHoverAnimation = () => {
		if (!hover) return {};

		const animations = {
			lift: {
				y: -5,
				transition: { duration: hoverDuration },
			},
			scale: {
				scale: 1.05,
				transition: { duration: hoverDuration },
			},
			rotate: {
				rotate: 3,
				transition: { duration: hoverDuration },
			},
			slideRight: {
				x: 10,
				transition: { duration: hoverDuration },
			},
			slideLeft: {
				x: -10,
				transition: { duration: hoverDuration },
			},
			liftScale: {
				y: -5,
				scale: 1.02,
				transition: { duration: hoverDuration },
			},
			liftRotate: {
				y: -5,
				rotate: 2,
				transition: { duration: hoverDuration },
			},
			scaleRotate: {
				scale: 1.05,
				rotate: 2,
				transition: { duration: hoverDuration },
			},
			custom: {
				y: hoverY,
				x: hoverX,
				scale: hoverScale,
				rotate: hoverRotate,
				transition: { duration: hoverDuration },
			},
		};

		return animations[hoverType] || animations.lift;
	};

	return (
		<motion.div
			ref={ref}
			className={className}
			initial={getInitial()}
			animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitial()}
			whileHover={getHoverAnimation()}
			transition={{
				duration,
				ease: "easeOut",
				delay: calculatedDelay,
			}}
		>
			{children}
		</motion.div>
	);
};

export default Reveal;
