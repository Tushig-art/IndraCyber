import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { ArrowLeft, Lock } from 'lucide-react';
import ClassScheduleAdmin from './admin/ClassScheduleAdmin';
import ClubsAdmin from './admin/ClubsAdmin';
import PsychologistAdmin from './admin/PsychologistAdmin';
import MenuAdmin from './admin/MenuAdmin';
import RulesAdmin from './admin/RulesAdmin';
import EventsAdmin from './admin/EventsAdmin';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Буруу нууц үг');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Lock className="w-6 h-6" />
              Админ нэвтрэх
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Нууц үг оруулах"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Нэвтрэх
              </Button>
              <p className="text-sm text-gray-600 text-center">
                Дэфолт нууц үг: admin123
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl">Админ самбар</h1>
                <p className="text-sm text-gray-600">Индра Кибер Сургууль</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              Гарах
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-6 h-auto bg-white shadow-lg rounded-xl p-2 mb-8">
            <TabsTrigger value="schedule" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Хичээлийн хуваарь
            </TabsTrigger>
            <TabsTrigger value="clubs" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
              Дугуйлан
            </TabsTrigger>
            <TabsTrigger value="psychologist" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Сэтгэлзүйч
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Меню
            </TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              Дүрэм
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-pink-600 data-[state=active]:text-white">
              Эвент
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <ClassScheduleAdmin />
          </TabsContent>

          <TabsContent value="clubs">
            <ClubsAdmin />
          </TabsContent>

          <TabsContent value="psychologist">
            <PsychologistAdmin />
          </TabsContent>

          <TabsContent value="menu">
            <MenuAdmin />
          </TabsContent>

          <TabsContent value="rules">
            <RulesAdmin />
          </TabsContent>

          <TabsContent value="events">
            <EventsAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
