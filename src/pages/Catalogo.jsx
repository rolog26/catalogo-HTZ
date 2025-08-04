import { Link } from "react-router-dom";
import celulares from "../data/celulares.json";
import { ProductCard } from "../components/ProductCard.jsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Catalogo() {
    const [redes, setRedes] = useState({});

    const getConfigFileName = () => {
        const hostname = window.location.hostname;
        if (hostname.includes("montecristo")) return "config-mc.json";
        if (hostname.includes("cofico")) return "config-cof.json";
        if (hostname.includes("altacordoba")) return "config-altacba.json";
        return "config.json";
    };

    const fetchConfig = async () => {
        try {
            const res = await fetch(getConfigFileName());
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error cargando config:", error);
            return { redes: {} };
        }
    };

    useEffect(() => {
        const loadConfig = async () => {
            const config = await fetchConfig();
            if (config.redes) {
                setRedes(config.redes);
            }
        };
        loadConfig();
    }, []);

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
                    <a href={redes.whatsapp}><img className="redes-image" src="/wsp-icon.png" alt="Logo de Whatsapp" /> {redes.numero}</a>{" "}
                    /
                    <a href={redes.instagram}><img className="redes-image" src="/ig-icon.png" alt="Logo de Instagram" /> {redes.usuario}</a>
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