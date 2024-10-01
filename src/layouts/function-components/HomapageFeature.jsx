import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";

const HomapageFeature = ({ feature_list }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-1 gap-7 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {feature_list.map((item, i) => {
        const FeatherIcon = Icon[humanize(item.icon)];
        return (
          <div
            key={i}
            className="relative h-[320px] sm:h-[450px] flex flex-col justify-end rounded overflow-hidden"
            style={{
              backgroundImage: `url(${item.image})`, // Usa la imagen de fondo
              backgroundSize: 'cover',
              backgroundPosition: 'center',
               // Define la altura del contenedor
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 sm:to-35% to-70%"></div>
            {/* Contenido del texto */}
            <div className="relative z-10 p-5 text-white">
              <h3 className="text-xl lg:text-2xl text-white font-bold">{item.title}</h3>
              <p className="text-base lg:text-lg leading-relaxed mt-2">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomapageFeature;
