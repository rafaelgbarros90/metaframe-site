import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Eles não fizeram o que eu pedi. Fizeram algo que eu nem sabia que precisava. Minha marca agora parece vir do futuro.",
    author: "CEO, CyberTech",
    role: "Cliente Corporativo"
  },
  {
    text: "Insano. A edição transformou nosso clipe em uma viagem alucinógena. Exatamente o caos que buscávamos.",
    author: "Banda Neon Void",
    role: "Produção Musical"
  },
  {
    text: "Não é design, é vandalismo digital de alta classe. O engajamento triplicou porque ninguém consegue parar de olhar.",
    author: "Marketing Director",
    role: "Fashion Brand"
  }
];

export function Testimonials() {
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-black relative z-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-display text-white uppercase mb-12 text-center">
          O que dizem <span className="text-meta-yellow">sobre nosso trabalho</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-zinc-900 p-8 border border-white/5 relative group hover:border-meta-blue transition-colors">
              <Quote className="w-12 h-12 text-meta-blue mb-6 opacity-50" />
              <p className="font-mono text-sm md:text-base text-gray-300 mb-6 leading-relaxed">
                "{item.text}"
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="font-display text-white uppercase">{item.author}</p>
                <p className="font-mono text-xs text-meta-yellow">{item.role}</p>
              </div>
              
              {/* Glitch decoration */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20 group-hover:border-meta-blue transition-colors" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20 group-hover:border-meta-blue transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
