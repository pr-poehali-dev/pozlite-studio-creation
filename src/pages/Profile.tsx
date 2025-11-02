import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_USER = {
  name: "Pozlite",
  email: "pozlite@example.com",
  bio: "Главный администратор PozLite Studio",
  avatar: "",
  role: "admin"
};

export default function Profile() {
  const [user, setUser] = useState(DEFAULT_USER);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Ошибка загрузки профиля:', e);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(user));
    console.log("Saving user data:", user);
    setIsEditing(false);
    toast({
      title: "Успешно сохранено!",
      description: "Ваш профиль обновлен",
    });
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Ошибка",
          description: "Можно загружать только изображения",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
        toast({
          title: "Фото загружено!",
          description: "Не забудьте сохранить изменения",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="gap-2">
            <Icon name="ArrowLeft" size={18} />
            Назад
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-4xl bg-primary/20">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button variant="outline" size="sm" onClick={handlePhotoClick}>
                      <Icon name="Upload" size={16} className="mr-2" />
                      Изменить фото
                    </Button>
                  </>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">{user.name}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  {user.role === "admin" && (
                    <Badge variant="default" className="gap-1">
                      <Icon name="Shield" size={14} />
                      Администратор
                    </Badge>
                  )}
                </div>

                {!isEditing ? (
                  <div>
                    <p className="text-foreground/80">{user.bio}</p>
                    <Button onClick={() => setIsEditing(true)} className="mt-4 gap-2">
                      <Icon name="Edit" size={16} />
                      Редактировать профиль
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">О себе</Label>
                      <Textarea
                        id="bio"
                        value={user.bio}
                        onChange={(e) => setUser({ ...user, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleSave} className="gap-2">
                        <Icon name="Save" size={16} />
                        Сохранить
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Отмена
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="activity">Активность</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
              <TabsTrigger value="security">Безопасность</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Последняя активность</h3>
                <div className="space-y-4">
                  {[
                    { action: "Вход в систему", time: "5 минут назад", icon: "LogIn" },
                    { action: "Обновление профиля", time: "2 часа назад", icon: "Edit" },
                    { action: "Публикация статьи", time: "1 день назад", icon: "FileText" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name={activity.icon as any} size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Настройки уведомлений</h3>
                <div className="space-y-4">
                  {[
                    { label: "Email уведомления", description: "Получать уведомления на почту" },
                    { label: "Push уведомления", description: "Получать уведомления в браузере" },
                    { label: "Новости и обновления", description: "Информация о новых функциях" }
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <div>
                        <p className="font-medium">{setting.label}</p>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Icon name="Check" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Безопасность аккаунта</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Пароль</p>
                      <Button variant="outline" size="sm">
                        Изменить
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Последнее изменение: 30 дней назад</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Двухфакторная аутентификация</p>
                      <Button variant="outline" size="sm">
                        Включить
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Дополнительная защита вашего аккаунта</p>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">Активные сеансы</p>
                      <Button variant="outline" size="sm">
                        Управление
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Просмотр устройств с доступом к аккаунту</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}