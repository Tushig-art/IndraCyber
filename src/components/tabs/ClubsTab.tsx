import { useState } from 'react';
import { Club } from '../../contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';

interface Props {
  clubs: Club[];
}

export default function ClubsTab({ clubs }: Props) {
  const [selectedType, setSelectedType] = useState<string>('all');

  const types = Array.from(new Set(clubs.map(c => c.type)));
  const filteredClubs = selectedType === 'all'
    ? clubs
    : clubs.filter(c => c.type === selectedType);

  const typeColors: Record<string, string> = {
    'Шинжлэх ухаан': 'bg-blue-500',
    'Технологи': 'bg-purple-500',
    'Урлаг': 'bg-pink-500',
    'Спорт': 'bg-green-500',
  };

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-3xl">Дугуйлангийн хуваарь</CardTitle>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Төрөл сонгох" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бүх төрөл</SelectItem>
              {types.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${typeColors[club.type] || 'bg-gray-500'} rounded-l-2xl`} />
              
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl pr-2">{club.name}</h3>
                  <Badge variant="secondary" className={`${typeColors[club.type] || 'bg-gray-500'} text-white`}>
                    {club.type}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <span>{club.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">⏰</span>
                  <span>{club.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">👨‍🏫</span>
                  <span>{club.teacher}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚪</span>
                  <span>{club.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
