import { motion } from "framer-motion";

export const ProductCard = ({ celular }) => {

    return (
        <motion.div
        className="card"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
        >
            <motion.h3>{celular.modelo}</motion.h3>
            <motion.img className="celular-image" src={celular.imagen} alt={celular.modelo} loading="lazy" />
            <p>Click para más información</p>
        </motion.div>
    );
};