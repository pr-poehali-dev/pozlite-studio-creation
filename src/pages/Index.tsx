import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import AuthMenu from "@/components/AuthMenu";

interface SakuraPetal {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  swing: number;
  size: number;
}

const Index = () => {
  const downloads: any[] = [];
  const [hoveredSakura, setHoveredSakura] = useState<number | null>(null);
  const [petals, setPetals] = useState<SakuraPetal[]>([]);

  useEffect(() => {
    if (hoveredSakura !== null) {
      const script = document.createElement('script');
      script.src = 'https://tenor.com/embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [hoveredSakura]);

  useEffect(() => {
    const initialPetals: SakuraPetal[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 100,
      rotation: Math.random() * 360,
      speed: 0.3 + Math.random() * 0.5,
      swing: Math.random() * 3 - 1.5,
      size: 0.8 + Math.random() * 0.7
    }));
    setPetals(initialPetals);

    const animatePetals = () => {
      setPetals(prev => prev.map(petal => {
        let newY = petal.y + petal.speed;
        let newX = petal.x + petal.swing * 0.05;
        
        if (newY > 110) {
          newY = -10;
          newX = Math.random() * 100;
        }
        
        if (newX < -5) newX = 100;
        if (newX > 105) newX = 0;
        
        return {
          ...petal,
          y: newY,
          x: newX,
          rotation: (petal.rotation + 1) % 360
        };
      }));
    };

    const interval = setInterval(animatePetals, 50);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://cdn.poehali.dev/files/9b3c99e0-dad4-4ae2-afa8-542b827f7cd2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 backdrop-blur-[2px]" />
      </div>

      {petals.map(petal => (
        <div
          key={petal.id}
          className="fixed pointer-events-none z-10"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            transform: `rotate(${petal.rotation}deg) scale(${petal.size})`,
            fontSize: '2rem',
            opacity: 0.7,
            transition: 'all 0.05s linear'
          }}
        >
          🌸
        </div>
      ))}
      
      <div className="relative z-20">


        <header className="container mx-auto px-4 py-6 md:py-12">
          <div className="flex justify-end mb-4">
            <AuthMenu />
          </div>
          <div className="relative animate-fade-in inline-block text-center w-full">
            <div 
              className="absolute -top-6 md:-top-12 -left-4 md:-left-8 text-3xl md:text-6xl animate-float opacity-80 cursor-pointer transition-transform hover:scale-125 z-50" 
              onMouseEnter={() => setHoveredSakura(0)}
              onMouseLeave={() => setHoveredSakura(null)}
            >
              🌸
              {hoveredSakura === 0 && (
                <div className="hidden md:block absolute -top-40 left-1/2 -translate-x-1/2 w-32 h-32 animate-fade-in pointer-events-none">
                  <div 
                    className="tenor-gif-embed" 
                    data-postid="6680118806096799072" 
                    data-share-method="host" 
                    data-aspect-ratio="1" 
                    data-width="100%"
                  ></div>
                </div>
              )}
            </div>
            <div 
              className="absolute -top-4 md:-top-8 -right-6 md:-right-12 text-4xl md:text-7xl animate-float opacity-70 cursor-pointer transition-transform hover:scale-125 z-50" 
              style={{ animationDelay: '0.3s' }}
              onMouseEnter={() => setHoveredSakura(1)}
              onMouseLeave={() => setHoveredSakura(null)}
            >
              🌸
              {hoveredSakura === 1 && (
                <div className="hidden md:block absolute -top-40 left-1/2 -translate-x-1/2 w-32 h-32 animate-fade-in pointer-events-none">
                  <div 
                    className="tenor-gif-embed" 
                    data-postid="6680118806096799072" 
                    data-share-method="host" 
                    data-aspect-ratio="1" 
                    data-width="100%"
                  ></div>
                </div>
              )}
            </div>
            <div 
              className="absolute -bottom-4 md:-bottom-8 -left-8 md:-left-16 text-3xl md:text-5xl animate-float opacity-60 cursor-pointer transition-transform hover:scale-125 z-50" 
              style={{ animationDelay: '0.6s' }}
              onMouseEnter={() => setHoveredSakura(2)}
              onMouseLeave={() => setHoveredSakura(null)}
            >
              🌸
              {hoveredSakura === 2 && (
                <div className="hidden md:block absolute -bottom-40 left-1/2 -translate-x-1/2 w-32 h-32 animate-fade-in pointer-events-none">
                  <div 
                    className="tenor-gif-embed" 
                    data-postid="6680118806096799072" 
                    data-share-method="host" 
                    data-aspect-ratio="1" 
                    data-width="100%"
                  ></div>
                </div>
              )}
            </div>
            <div 
              className="absolute -bottom-5 md:-bottom-10 -right-5 md:-right-10 text-3xl md:text-6xl animate-float opacity-75 cursor-pointer transition-transform hover:scale-125 z-50" 
              style={{ animationDelay: '0.9s' }}
              onMouseEnter={() => setHoveredSakura(3)}
              onMouseLeave={() => setHoveredSakura(null)}
            >
              🌸
              {hoveredSakura === 3 && (
                <div className="hidden md:block absolute -bottom-40 left-1/2 -translate-x-1/2 w-32 h-32 animate-fade-in pointer-events-none">
                  <div 
                    className="tenor-gif-embed" 
                    data-postid="6680118806096799072" 
                    data-share-method="host" 
                    data-aspect-ratio="1" 
                    data-width="100%"
                  ></div>
                </div>
              )}
            </div>
            <div className="hidden md:block absolute top-1/4 -left-20 text-4xl animate-float opacity-50" style={{ animationDelay: '1.2s' }}>🌸</div>
            <div className="hidden md:block absolute top-1/3 -right-18 text-5xl animate-float opacity-65" style={{ animationDelay: '1.5s' }}>🌸</div>
            <div className="hidden lg:block absolute top-10 -left-24 text-3xl animate-float opacity-45" style={{ animationDelay: '1.8s' }}>🌸</div>
            <div className="hidden lg:block absolute top-16 -right-20 text-4xl animate-float opacity-55" style={{ animationDelay: '2.1s' }}>🌸</div>
            <div className="hidden lg:block absolute bottom-12 -left-10 text-5xl animate-float opacity-70" style={{ animationDelay: '2.4s' }}>🌸</div>
            <div className="hidden lg:block absolute bottom-16 -right-16 text-4xl animate-float opacity-60" style={{ animationDelay: '2.7s' }}>🌸</div>
            
            <div className="relative p-1 md:p-2 rounded-2xl md:rounded-3xl bg-gradient-to-r from-purple-400 via-rose-400 to-pink-400 glow-box shadow-xl md:shadow-2xl shadow-purple-500/50">
              <div className="bg-background/95 backdrop-blur-sm rounded-xl md:rounded-2xl px-6 py-4 md:px-12 md:py-8">
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-2 md:mb-4 glow-text tracking-tight">
                  PozLite Studio
                </h1>
                <div className="h-1 md:h-1.5 w-32 md:w-48 mx-auto bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-shimmer" 
                     style={{ backgroundSize: '200% 100%' }} />
              </div>
            </div>
          </div>
          
          <p className="text-base md:text-xl lg:text-2xl text-muted-foreground mt-6 md:mt-12 max-w-2xl mx-auto font-light animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
            Привет это Pozetiv4ik_lite это мой сайт тут ты найдешь все что хочешь))
          </p>

          <div className="mt-8 md:mt-16 animate-fade-in px-4" style={{ animationDelay: '0.3s' }}>
            <Card className="overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-primary/30 glow-box">
              <div className="relative h-64 md:h-80 lg:h-96 flex items-center justify-center p-4 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                <div className="relative z-10 text-center space-y-3 md:space-y-6">
                  <Badge className="bg-primary/80 text-primary-foreground text-xs md:text-sm px-3 md:px-4 py-1 md:py-2 animate-float">
                    🚀 Новинка
                  </Badge>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold glow-text px-4">
                    Скоро большое обновление!
                  </h2>
                  <p className="text-sm md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
                    Следите за анонсами в нашем блоге
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center mt-4 md:mt-8">
                    <Button size="default" className="bg-primary hover:bg-primary/90 glow-box w-full sm:w-auto">
                      <Icon name="Bell" size={18} className="mr-2" />
                      <span className="text-sm md:text-base">Подписаться на новости</span>
                    </Button>
                    <Button size="default" variant="outline" className="gradient-border w-full sm:w-auto">
                      <Icon name="Info" size={18} className="mr-2" />
                      <span className="text-sm md:text-base">Узнать больше</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </header>

        <section className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 animate-fade-in gap-4" style={{ animationDelay: '0.2s' }}>
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-2 flex items-center gap-2 md:gap-3">
                <Icon name="Download" className="text-primary" size={28} />
                Скачать
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">Лучшие инструменты для профессионалов</p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center gap-2 gradient-border">
              <Icon name="Grid3x3" size={18} />
              Все категории
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {downloads.map((item, index) => (
              <Card 
                key={index} 
                className="group p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-box cursor-pointer animate-fade-in"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon name={item.icon as any} className="text-primary" size={28} />
                  </div>
                  <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Icon name="HardDrive" size={14} />
                    {item.size}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    {item.downloads}
                  </span>
                </div>
                
                <Button className="w-full bg-primary/90 hover:bg-primary group-hover:glow-box transition-all">
                  <Icon name="Download" size={16} className="mr-2" />
                  Скачать
                </Button>
              </Card>
            ))}
          </div>


        </section>

        <footer className="container mx-auto px-4 py-8 md:py-12 border-t border-border/50 mt-12 md:mt-24">
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold glow-text">PozLite Studio</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <a 
                href="https://www.youtube.com/@Pozetiv_lite" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] border border-transparent hover:border-red-500/50 transition-all group"
              >
                <Icon name="Youtube" size={20} className="text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-sm md:text-base text-foreground/90 group-hover:text-red-400 transition-colors">YouTube</span>
              </a>
              
              <a 
                href="https://t.me/pozetiv4ik_lite_stybuo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] border border-transparent hover:border-blue-500/50 transition-all group"
              >
                <Icon name="Send" size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm md:text-base text-foreground/90 group-hover:text-blue-400 transition-colors">Telegram</span>
              </a>
              
              <a 
                href="https://vk.com/pozetiv4ik_iat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-600/20 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-transparent hover:border-blue-600/50 transition-all group"
              >
                <Icon name="Share2" size={20} className="text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-sm md:text-base text-foreground/90 group-hover:text-blue-500 transition-colors">VK</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-border/30">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>Главный администратор:</span>
                <span className="text-primary font-semibold">Pozlite (PozLite Studio)</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;