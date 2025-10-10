import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { FaInstagram, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

export default function Locales() {
    const locales = [
        {
            nombre: "HTZ Cofico",
            direccion: "N. Rodriguez Peña 1441, Córdoba",
            telefono: "3516660169",
            instagram: "htzserviciotecnico",
            imagen: "/frenteLocales/htzCofico.webp",
            mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54489.799353979215!2d-64.26713347435002!3d-31.39724770728189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432977630609413%3A0x1cfc9c141324c263!2sHTZ%20Servicio%20Tecnico!5e0!3m2!1ses-419!2sar!4v1759417595503!5m2!1ses-419!2sar",
            whatsappLink: "https://wa.me/543516660169",
            instagramLink: "https://www.instagram.com/htzserviciotecnico/",
            mapsLink: "https://maps.app.goo.gl/YgPX5Gm54zagzsHr6"
        },
        {
            nombre: "HTZ Monte Cristo",
            direccion: "Manuel Pizarro 140, Monte Cristo",
            telefono: "3513574139",
            instagram: "htzmontecristo",
            imagen: "/frenteLocales/htzMonteCristo.webp",
            mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54506.94570758982!2d-64.01893337905037!3d-31.367695270361896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432eb000af8606d%3A0x33b34da9116712d9!2sHTZ%20Servicio%20T%C3%A9cnico%20Monte%20Cristo!5e0!3m2!1ses-419!2sar!4v1759417698520!5m2!1ses-419!2sar",
            whatsappLink: "https://wa.me/543513574139",
            instagramLink: "https://www.instagram.com/htzmontecristo/",
            mapsLink: "https://maps.app.goo.gl/TtJhPUM1gPYrDvxCA"
        },
        {
            nombre: "HTZ Alta Córdoba",
            direccion: "Trafalgar 689, Córdoba",
            telefono: "3518184077",
            instagram: "htzaltacordoba",
            imagen: "/frenteLocales/htzAltaCordoba.webp",
            mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54496.02870115166!2d-64.25980567932126!3d-31.386514064163556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943299ffbe97add7%3A0x55d1fd54f197f61f!2sHTZ%20Servicio%20Tecnico%20Alta%20Cba!5e0!3m2!1ses-419!2sar!4v1759417761962!5m2!1ses-419!2sar",
            whatsappLink: "https://wa.me/543518184077",
            instagramLink: "https://www.instagram.com/htzaltacordoba/",
            mapsLink: "https://maps.app.goo.gl/miRyuQhtmKsFQmv6A"
        },
        {
            nombre: "HTZ Bedoya",
            direccion: "José María Bedoya 503, Córdoba",
            telefono: "3518009266",
            instagram: "htzbedoya",
            imagen: "/frenteLocales/htzBedoya.webp",
            mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54492.5421154796!2d-64.24813270568845!3d-31.392522124811066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432990006a557a7%3A0xb364750f3ec15d31!2sHtz%20Servicio%20T%C3%A9cnico%20Bedoya!5e0!3m2!1ses-419!2sar!4v1759417805755!5m2!1ses-419!2sar",
            whatsappLink: "https://wa.me/543518009266",
            instagramLink: "https://www.instagram.com/htzbedoya/",
            mapsLink: "https://maps.app.goo.gl/x7eaEMnAU1D2S6jY8"
        }
    ];

    return (
        <div className="locales">
            <motion.div
                className="locales-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
            >
                <motion.h1 className="title">Nuestros Locales</motion.h1>
                <div className="grid">
                    {locales.map((local) => (
                        <motion.div
                            className="local-card"
                            key={local.nombre}
                            whileOver={{ scale: 1 }}
                        >
                            <img src={local.imagen} alt={local.nombre} className="local-img" />
                            <div className="local-info">
                                <h2>{local.nombre}</h2>
                                <a href={local.mapsLink}><FaMapMarkerAlt size={18} /> {local.direccion}</a>
                                <a href={local.whatsappLink}><FaWhatsapp size={20} /> {local.telefono}</a>
                                <a href={local.instagramLink}><FaInstagram size={20} /> @{local.instagram}</a>
                            </div>
                            <div className="local-map">
                                <iframe
                                    src={local.mapsEmbed}
                                    width="100%"
                                    height="250"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`Mapa ${local.nombre}`}
                                ></iframe>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}