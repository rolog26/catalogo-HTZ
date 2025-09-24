import { Link } from "react-router-dom";
import celulares from "../data/celulares.json";
import { ProductCard } from "../components/ProductCard.jsx";
import { motion } from "framer-motion";

export default function Catalogo() {

    const celularesPorMarca = celulares.reduce((acc, celular) => {
        if (!acc[celular.marca]) {
            acc[celular.marca] = [];
        }
        acc[celular.marca].push(celular);
        return acc;
    }, {})

    return (
        <motion.div
            className="catalogo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
        >
            <div className="aviso">
                <p>
                    Consultá por otros modelos vía {" "}
                    <a href="https://wa.me/5493516660169"><img className="redes-image" src="/wsp-icon.png" alt="Logo de Whatsapp" /> 3516660169</a>{" "}
                    /
                    <a href="https://www.instagram.com/htzserviciotecnico"><img className="redes-image" src="/ig-icon.png" alt="Logo de Instagram" /> @htzserviciotecnico</a>
                </p>
            </div>
            <h1 className="title">CATÁLOGO DE CELULARES</h1>
            {Object.entries(celularesPorMarca).map(([marca, celulares]) => (
                <div key={marca} className="marca-section">
                    <h2>{marca}</h2>
                    <div className="grid">
                        {celulares.map(celular => (
                            <Link key={celular.id} to={`/celular/${celular.id}`}>
                                <ProductCard celular={celular} />
                            </Link>
                        ))}
                    </div>
                </div>
            ))
            }
        </motion.div>
    )
}