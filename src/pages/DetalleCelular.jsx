import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import celulares from "../data/celulares.json";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function DetalleCelular() {
    const [dolar, setDolar] = useState(null);
    const [tasas, setTasas] = useState({});
    const { id } = useParams();
    const celular = celulares.find(c => c.id === parseInt(id));

    useEffect(() => {
        fetch("/config.json")
            .then(res => res.json())
            .then(data => {
                setDolar(data.dolar);
                setTasas(data.tasas);
            })
            .catch(err => console.error("Error al cargar la configuración:", err));
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, []);

    if (!celular) return <h2>Celular no encontrado</h2>;

    return (
        <div className="detalle-celular">
            <div className="aviso">
                <p>
                    Los precios pueden estar sujetos a cambios. Consultá vía
                    <Link to="/locales"> <FaWhatsapp size={18} />Whatsapp / <FaInstagram size={18} />Instagram</Link>
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