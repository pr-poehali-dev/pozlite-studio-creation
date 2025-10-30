import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  const downloads: any[] = [];

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
        <section className="container mx-auto px-4 pt-8 pb-4">
          <div className="relative animate-fade-in">
            <div className="absolute top-4 left-4 text-6xl animate-float opacity-70">🌸</div>
            <div className="absolute top-8 right-8 text-5xl animate-float opacity-60" style={{ animationDelay: '0.5s' }}>🌸</div>
            <div className="absolute bottom-12 left-12 text-4xl animate-float opacity-50" style={{ animationDelay: '1s' }}>🌸</div>
            <div className="absolute bottom-8 right-6 text-5xl animate-float opacity-65" style={{ animationDelay: '1.5s' }}>🌸</div>
            <div className="absolute top-1/3 left-6 text-3xl animate-float opacity-40" style={{ animationDelay: '2s' }}>🌸</div>
            <div className="absolute top-2/3 right-12 text-4xl animate-float opacity-55" style={{ animationDelay: '2.5s' }}>🌸</div>
            
            <div className="relative p-1 rounded-2xl bg-gradient-to-r from-purple-400 via-rose-400 to-pink-400 glow-box">
              <div className="bg-background rounded-xl p-1">
                <Card className="overflow-hidden border-0 rounded-xl">
                  <div className="relative h-64 md:h-80 lg:h-[500px]">
                    <img 
                      src="https://cdn.poehali.dev/files/4c68eda5-49f0-4d74-9e5f-24a4f15b3859.jpg" 
                      alt="PozLite Studio Banner"
                      className="w-full h-full object-cover object-center rounded-xl"
                      style={{ imageRendering: 'crisp-edges' }}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent rounded-xl" />
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <a 
              href="https://www.youtube.com/@Pozetiv_lite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-lg text-muted-foreground hover:text-primary transition-colors group"
            >
              <Icon name="Youtube" size={28} className="text-accent group-hover:animate-glow-pulse" />
              <span className="font-medium">YouTube: @Pozetiv_lite</span>
              <Icon name="ExternalLink" size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </section>

        <header className="container mx-auto px-4 py-12 text-center">
          <div className="relative animate-fade-in inline-block">
            <div className="absolute -top-12 -left-8 text-6xl animate-float opacity-80">🌸</div>
            <div className="absolute -top-8 -right-12 text-7xl animate-float opacity-70" style={{ animationDelay: '0.3s' }}>🌸</div>
            <div className="absolute -bottom-8 -left-16 text-5xl animate-float opacity-60" style={{ animationDelay: '0.6s' }}>🌸</div>
            <div className="absolute -bottom-10 -right-10 text-6xl animate-float opacity-75" style={{ animationDelay: '0.9s' }}>🌸</div>
            <div className="absolute top-1/4 -left-20 text-4xl animate-float opacity-50" style={{ animationDelay: '1.2s' }}>🌸</div>
            <div className="absolute top-1/3 -right-18 text-5xl animate-float opacity-65" style={{ animationDelay: '1.5s' }}>🌸</div>
            <div className="absolute top-10 -left-24 text-3xl animate-float opacity-45" style={{ animationDelay: '1.8s' }}>🌸</div>
            <div className="absolute top-16 -right-20 text-4xl animate-float opacity-55" style={{ animationDelay: '2.1s' }}>🌸</div>
            <div className="absolute bottom-12 -left-10 text-5xl animate-float opacity-70" style={{ animationDelay: '2.4s' }}>🌸</div>
            <div className="absolute bottom-16 -right-16 text-4xl animate-float opacity-60" style={{ animationDelay: '2.7s' }}>🌸</div>
            
            <div className="relative p-2 rounded-3xl bg-gradient-to-r from-purple-400 via-rose-400 to-pink-400 glow-box shadow-2xl shadow-purple-500/50">
              <div className="bg-background/95 backdrop-blur-sm rounded-2xl px-12 py-8">
                <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 glow-text tracking-tight">
                  PozLite Studio
                </h1>
                <div className="h-1.5 w-48 mx-auto bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-shimmer" 
                     style={{ backgroundSize: '200% 100%' }} />
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mt-12 max-w-2xl mx-auto font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Создаём будущее цифровых продуктов
          </p>

          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-primary/30 glow-box">
              <div className="relative h-80 md:h-96 flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                <div className="relative z-10 text-center space-y-6">
                  <Badge className="bg-primary/80 text-primary-foreground text-sm px-4 py-2 animate-float">
                    🚀 Новинка
                  </Badge>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold glow-text">
                    Скоро большое обновление!
                  </h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    Следите за анонсами в нашем блоге
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center mt-8">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 glow-box">
                      <Icon name="Bell" size={20} className="mr-2" />
                      Подписаться на новости
                    </Button>
                    <Button size="lg" variant="outline" className="gradient-border">
                      <Icon name="Info" size={20} className="mr-2" />
                      Узнать больше
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </header>

        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div>
              <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Icon name="Download" className="text-primary" size={36} />
                Скачать
              </h2>
              <p className="text-muted-foreground">Лучшие инструменты для профессионалов</p>
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
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Icon name="BookOpen" className="text-secondary" size={36} />
                  Блог
                </h2>
                <p className="text-muted-foreground">Статьи и новости из мира технологий</p>
              </div>
              <Button variant="outline" className="hidden md:flex items-center gap-2 gradient-border">
                Все статьи
                <Icon name="ArrowRight" size={18} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post, index) => (
                <Card 
                  key={index}
                  className="group p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-box cursor-pointer overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Badge variant="outline" className="mb-4 border-secondary/50 text-secondary">
                    {post.category}
                  </Badge>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-secondary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Button variant="ghost" className="w-full justify-between group-hover:text-secondary">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <footer className="container mx-auto px-4 py-12 border-t border-border/50 mt-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 glow-text">PozLite Studio</h3>
              <p className="text-sm text-muted-foreground">Создаём с 2024 года</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary hover:glow-box transition-all">
                <Icon name="Github" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-secondary hover:glow-box transition-all">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-accent hover:glow-box transition-all">
                <Icon name="Linkedin" size={20} />
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;