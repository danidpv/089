import { Lightbox } from "@/components/common/Lightbox";

const images = [
  { src: "/images/barberia/interior-03.jpg", alt: "Vista del local de 089 con sillones y espejos", label: "Interior" },
  { src: "/images/productos/ceras/product-shelf-01.jpg", alt: "Expositor de productos profesionales de 089", label: "Producto" },
  { src: "/images/barberia/recepcion.jpg", alt: "Recepción de 089 Barbería Profesional", label: "Recepción" }
];

export function BarbershopPreview() {
  return (
    <section className="section" id="barberia">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="kicker">La barbería</p>
            <h2 className="display">Mira 089<br />por dentro.</h2>
          </div>
          <p className="lead">Una pequeña mirada al espacio, el ambiente y la identidad de 089 antes de venir.</p>
        </div>
        <Lightbox images={images} />
      </div>
    </section>
  );
}
