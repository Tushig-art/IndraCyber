import { MenuItem } from '../../contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Props {
  menu: MenuItem[];
}

export default function MenuTab({ menu }: Props) {
  const mealIcons = {
    breakfast: '',
    lunch: '',
    snack: '',
  };

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-3xl">Долоо хоногийн меню</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {menu.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 text-center">
                <div className="text-2xl">{item.day}</div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{mealIcons.breakfast}</span>
                    <span className="text-gray-600 dark:text-gray-400">Өглөөний цай</span>
                  </div>
                  <div className="pl-9">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {item.breakfast}
                    </p>
                  </div>
                </div>

                <div className="border-t border-orange-200 dark:border-orange-800 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{mealIcons.lunch}</span>
                    <span className="text-gray-600 dark:text-gray-400">Өдрийн хоол</span>
                  </div>
                  <div className="pl-9">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {item.lunch}
                    </p>
                  </div>
                </div>

                <div className="border-t border-orange-200 dark:border-orange-800 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{mealIcons.snack}</span>
                    <span className="text-gray-600 dark:text-gray-400">Зууш</span>
                  </div>
                  <div className="pl-9">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {item.snack}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl"></div>
            <div>
              <h4 className="text-xl mb-2">Хоолны мэдээлэл</h4>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Бүх хоол нь шим тэжээлийн мэргэжилтнүүдийн зөвлөмжөөр бэлтгэгдсэн. 
                Хүнсний харшилтай сурагчид урьдчилан мэдэгдэнэ үү.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
