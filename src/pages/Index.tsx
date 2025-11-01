import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

const Index = () => {
  const downloads: any[] = [];
  const [hoveredSakura, setHoveredSakura] = useState<number | null>(null);

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

  const blogPosts = [
    {
      title: "Будущее веб-разработки в 2025",
      excerpt: "Исследуем новые технологии и тренды индустрии",
      date: "28 Окт 2024",
      readTime: "5 мин",
      category: "Технологии"
    },
    {
      title: "10 советов по оптимизации производительности",
      excerpt: "Как сделать ваше приложение быстрее",
      date: "25 Окт 2024",
      readTime: "8 мин",
      category: "Разработка"
    },
    {
      title: "Дизайн-система: с чего начать",
      excerpt: "Создаем единый язык для вашего продукта",
      date: "22 Окт 2024",
      readTime: "6 мин",
      category: "Дизайн"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative">


        <header className="container mx-auto px-4 py-6 md:py-12 text-center">
          <div className="relative animate-fade-in inline-block">
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

          <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-4">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-2 flex items-center gap-2 md:gap-3">
                  <Icon name="BookOpen" className="text-secondary" size={28} />
                  Блог
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">Статьи и новости из мира технологий</p>
              </div>
              <Button variant="outline" className="hidden md:flex items-center gap-2 gradient-border">
                Все статьи
                <Icon name="ArrowRight" size={18} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {blogPosts.map((post, index) => (
                <Card 
                  key={index}
                  className="group p-4 md:p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-box cursor-pointer overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Badge variant="outline" className="mb-3 md:mb-4 border-secondary/50 text-secondary text-xs">
                    {post.category}
                  </Badge>
                  
                  <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 md:gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/50">
                    <Button variant="ghost" size="sm" className="w-full justify-between group-hover:text-secondary text-xs md:text-sm">
                      Читать далее
                      <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-8 md:py-12 border-t border-border/50 mt-12 md:mt-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 glow-text">PozLite Studio</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Создаём с 2024 года</p>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary hover:glow-box transition-all h-9 w-9 md:h-10 md:w-10">
                <Icon name="Github" size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-secondary hover:glow-box transition-all h-9 w-9 md:h-10 md:w-10">
                <Icon name="Twitter" size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-accent hover:glow-box transition-all h-9 w-9 md:h-10 md:w-10">
                <Icon name="Linkedin" size={18} />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;