import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "blocked";
  registeredAt: string;
  avatar?: string;
}

export default function Admin() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Pozlite",
      email: "pozlite@example.com",
      role: "admin",
      status: "active",
      registeredAt: "2024-01-01",
      avatar: ""
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setIsAdmin(userData.role === "admin");
      } catch (e) {
        console.error('Ошибка:', e);
      }
    }
  }, []);

  const handleBlockUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "blocked" : "active" }
        : user
    ));
    toast({
      title: "Статус изменен",
      description: "Пользователь успешно обновлен",
    });
  };

  const handleChangeRole = (userId: string) => {
    const user = users.find(u => u.id === userId);
    
    if (user?.id === "1") {
      toast({
        title: "Действие запрещено",
        description: "Нельзя изменить роль главного администратора",
        variant: "destructive"
      });
      return;
    }
    
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: user.role === "admin" ? "user" : "admin" }
        : user
    ));
    toast({
      title: "Роль изменена",
      description: "Роль пользователя обновлена",
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === "1") {
      toast({
        title: "Действие запрещено",
        description: "Нельзя удалить главного администратора",
        variant: "destructive"
      });
      return;
    }
    
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "Пользователь удален",
      description: "Пользователь успешно удален из системы",
      variant: "destructive"
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === "active").length,
    blocked: users.filter(u => u.status === "blocked").length,
    admins: users.filter(u => u.role === "admin").length
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80">
        <Card className="p-8 text-center">
          <Icon name="ShieldAlert" size={48} className="mx-auto mb-4 text-destructive" />
          <h1 className="text-2xl font-bold mb-2">Доступ запрещен</h1>
          <p className="text-muted-foreground mb-4">У вас нет прав для просмотра этой страницы</p>
          <Button onClick={() => window.history.back()}>
            Вернуться назад
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="gap-2">
            <Icon name="ArrowLeft" size={18} />
            Назад
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
          <p className="text-muted-foreground">Управление пользователями и системой</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Всего</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Активных</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <Icon name="Ban" size={24} className="text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Заблокировано</p>
                <p className="text-2xl font-bold">{stats.blocked}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Админов</p>
                <p className="text-2xl font-bold">{stats.admins}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList>
            <TabsTrigger value="users">Пользователи</TabsTrigger>
            <TabsTrigger value="activity">Активность</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Управление пользователями</h3>
                <div className="flex gap-2">
                  <Input
                    placeholder="Поиск пользователей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Пользователь</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Роль</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Регистрация</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {user.id === "1" ? (
                              <div className="relative">
                                <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-red-500 text-xs animate-pulse">▲</span>
                                <span className="absolute -right-6 top-1/2 -translate-y-1/2 text-red-500 text-xs animate-pulse" style={{animationDelay: '0.3s'}}>▲</span>
                                <span className="absolute -left-8 top-0 text-yellow-400 text-[8px] animate-bounce">⭐</span>
                                <span className="absolute -right-8 top-0 text-yellow-400 text-[8px] animate-bounce" style={{animationDelay: '0.5s'}}>⭐</span>
                                <span className="absolute -left-8 bottom-0 text-yellow-400 text-[8px] animate-bounce" style={{animationDelay: '0.7s'}}>⭐</span>
                                <span className="absolute -right-8 bottom-0 text-yellow-400 text-[8px] animate-bounce" style={{animationDelay: '0.2s'}}>⭐</span>
                                <span className="font-medium text-red-500 font-bold">
                                  {user.name}
                                </span>
                              </div>
                            ) : (
                              <span className="font-medium">{user.name}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                            {user.id === "1" ? "Гл-админ" : user.role === "admin" ? "Админ" : "Пользователь"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "destructive"}>
                            {user.status === "active" ? "Активен" : "Заблокирован"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.registeredAt).toLocaleDateString('ru-RU')}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Icon name="MoreVertical" size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Управление пользователем</DialogTitle>
                                  <DialogDescription>
                                    {user.name} ({user.email})
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-2">
                                  <Button 
                                    onClick={() => handleChangeRole(user.id)}
                                    className="w-full justify-start"
                                    variant="outline"
                                    disabled={user.id === "1"}
                                  >
                                    <Icon name="Shield" size={16} className="mr-2" />
                                    {user.role === "admin" ? "Снять права админа" : "Сделать админом"}
                                  </Button>
                                  <Button 
                                    onClick={() => handleBlockUser(user.id)}
                                    className="w-full justify-start"
                                    variant="outline"
                                    disabled={user.id === "1"}
                                  >
                                    <Icon name="Ban" size={16} className="mr-2" />
                                    {user.status === "active" ? "Заблокировать" : "Разблокировать"}
                                  </Button>
                                  <Button 
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="w-full justify-start"
                                    variant="destructive"
                                    disabled={user.id === "1"}
                                  >
                                    <Icon name="Trash2" size={16} className="mr-2" />
                                    Удалить пользователя
                                  </Button>
                                  {user.id === "1" && (
                                    <p className="text-xs text-muted-foreground text-center pt-2">
                                      🛡️ Главный администратор защищен
                                    </p>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Последняя активность</h3>
              <div className="space-y-4">
                {[
                  { user: "Мария Смирнова", action: "Зарегистрировалась", time: "2 минуты назад", icon: "UserPlus" },
                  { user: "Иван Петров", action: "Обновил профиль", time: "15 минут назад", icon: "Edit" },
                  { user: "Pozlite", action: "Изменил настройки", time: "1 час назад", icon: "Settings" }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={activity.icon as any} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Настройки системы</h3>
              <div className="space-y-4">
                {[
                  { label: "Регистрация новых пользователей", description: "Разрешить регистрацию" },
                  { label: "Email уведомления", description: "Отправлять уведомления администратору" },
                  { label: "Двухфакторная аутентификация", description: "Требовать 2FA для всех" },
                  { label: "Логирование действий", description: "Сохранять историю действий пользователей" }
                ].map((setting, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
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
        </Tabs>
      </div>
    </div>
  );
}