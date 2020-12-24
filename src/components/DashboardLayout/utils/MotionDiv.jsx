import React from 'react';
import { motion } from 'framer-motion';

const variants = {
	initial: { opacity: 0 },
	animate: { opacity: 1, transition: { duration: 0.5 } },
	exit: { opacity: 0 },
};

export default function MotionDiv({ children }) {
	return (
		<motion.div variants={variants} initial="initial" animate="animate" exit="exit">
			{children}
		</motion.div>
	);
}
