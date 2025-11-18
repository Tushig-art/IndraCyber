import { Rule } from '../../contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import * as Icons from 'lucide-react';

interface Props {
  rules: Rule[];
}

export default function RulesTab({ rules }: Props) {
  const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8" /> : null;
  };

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-3xl">Сургуулийн дүрэм журам</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rules.map((rule, index) => {
            const colors = [
              'from-red-500 to-pink-500',
              'from-blue-500 to-cyan-500',
              'from-green-500 to-teal-500',
              'from-yellow-500 to-orange-500',
              'from-purple-500 to-indigo-500',
              'from-pink-500 to-rose-500',
            ];
            const bgColors = [
              'bg-red-50 dark:bg-red-900/20',
              'bg-blue-50 dark:bg-blue-900/20',
              'bg-green-50 dark:bg-green-900/20',
              'bg-yellow-50 dark:bg-yellow-900/20',
              'bg-purple-50 dark:bg-purple-900/20',
              'bg-pink-50 dark:bg-pink-900/20',
            ];

            return (
              <div
                key={rule.id}
                className={`${bgColors[index % bgColors.length]} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[index % colors.length]} text-white flex items-center justify-center shadow-lg`}>
                    {getIcon(rule.icon)}
                  </div>
                  
                  <h3 className="text-2xl">{rule.title}</h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-2xl p-6 border-l-4 border-red-500">
          <div className="flex items-start gap-4">
            <div className="text-4xl">⚠️</div>
            <div>
              <h4 className="text-xl mb-2">Чухал санамж</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Эдгээр дүрмүүдийг дагаж мөрдөх нь таны болон бусад сурагчдын аюулгүй, 
                тав тухтай орчинг бүрдүүлэхэд туслана. Дүрэм зөрчсөн тохиолдолд 
                сургуулийн удирдлагад мэдэгдэнэ.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
