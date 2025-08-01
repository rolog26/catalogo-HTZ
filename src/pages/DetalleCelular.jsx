import { useParams } from "react-router-dom";
import celulares from "../data/celulares.json";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function DetalleCelular() {
    const [dolar, setDolar] = useState(null);
    const [tasas, setTasas] = useState({});
    const [redes, setRedes] = useState({});
    const { id } = useParams();
    const celular = celulares.find(c => c.id === parseInt(id));

    const getConfigFileName = () => {
        const hostname = window.location.hostname;
        if (hostname.includes("montecristo")) return "/config-mc.json";
        if (hostname.includes("cofico")) return "/config-cof.json";
        return "/config.json";
    };

    const fetchConfig = async () => {
        try {
            const res = await fetch(getConfigFileName());
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error fetching config:", error);
            return { dolar: 0, tasas: {} };
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth"})
        const loadConfig = async () => {
            const config = await fetchConfig();
                if (config) {
                    setDolar(config.dolar);
                    setTasas(config.tasas);
                    setRedes(config.redes || {});
                }
        };
        loadConfig();
    }, []);

    if (!celular) return <h2>Celular no encontrado</h2>;

    return (
        <div className="detalle-celular">
            <div className="aviso">
                <p>
                    Los precios pueden estar sujetos a cambios. Consultá vía{" "}
                    <a href={redes.whatsapp}><img className="redes-image" src="/wsp-icon.png" alt="Logo de Whatsapp" /> {redes.numero}</a>{" "}
                    /
                    <a href={redes.instagram}><img className="redes-image" src="/ig-icon.png" alt="Logo de Instagram" /> {redes.usuario}</a>
                </p>
            </div>
            <motion.div
                className="card-detalle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
            >
                <motion.h3>{celular.marca} {celular.modelo}</motion.h3>
                <motion.img className="celular-image" src={celular.imagen} alt={celular.modelo} />
                <AnimatePresence mode="wait">
                    <motion.ul className="variantes-list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        {celular.variantes.map((variante, i) => {
                            const precioARS = variante.precio * dolar;

                            return (
                                <li key={i}>
                                    <strong>{variante.almacenamiento}</strong> -{" "}
                                    {variante.precio.toLocaleString()} USD -{" "}
                                    {precioARS.toLocaleString("es-AR", {
                                        style: "currency",
                                        currency: "ARS",
                                        minimumFractionDigits: 0
                                    })}
                                    {
                                        <div className="cuotas">
                                            {Object.entries(tasas).map(([cuotas, interes]) => {
                                                const total = precioARS * interes;
                                                return (
                                                    <p key={cuotas}>
                                                        {cuotas} cuotas de {" "}{(total / cuotas).toLocaleString("es-AR", {
                                                            style: "currency",
                                                            currency: "ARS",
                                                            minimumFractionDigits: 0
                                                        })}<br />
                                                        (Total: {" "}{total.toLocaleString("es-AR", {
                                                            style: "currency",
                                                            currency: "ARS",
                                                            minimumFractionDigits: 0
                                                        })})
                                                    </p>
                                                )
                                            })
                                            }
                                        </div>
                                    }
                                </li>
                            )
                        })}
                    </motion.ul>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}