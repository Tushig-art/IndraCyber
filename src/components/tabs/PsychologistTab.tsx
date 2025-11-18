import { PsychologistHour } from '../../contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  hours: PsychologistHour[];
}

export default function PsychologistTab({ hours }: Props) {
  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-3xl">Сэтгэлзүйчийн цаг</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {hours.map((hour) => (
            <div
              key={hour.id}
              className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-3xl p-8 shadow-lg"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 space-y-6">
                  <div>
                    <div className="text-green-600 dark:text-green-400 mb-2">Сэтгэлзүйч</div>
                    <div className="text-3xl">{hour.psychologist}</div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">📅</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Өдрүүд</div>
                        <div className="text-xl">{hour.day}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">⏰</span>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Цаг</div>
                        <div className="text-xl">{hour.time}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-green-200 dark:border-green-800">
                    <p className="text-gray-600 dark:text-gray-400">
                      QR код-ыг уншуулж уулзалт товлох боломжтой
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <QRCodeSVG
                      value={hour.qrCode}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                    <div className="text-center mt-4 text-sm text-gray-600">
                      Уулзалт товлох
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">💭</div>
            <h4 className="text-xl mb-2">Зөвлөгөө өгөх</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Сургалт, карьер, хувийн асуудлаар зөвлөгөө
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🧘</div>
            <h4 className="text-xl mb-2">Стресс удирдлага</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Сэтгэл санааны эрүүл мэндийг хадгалах
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-2">🤝</div>
            <h4 className="text-xl mb-2">Харилцааны дэмжлэг</h4>
            <p className="text-gray-600 dark:text-gray-400">
              Найз нөхөд, гэр бүлтэй харилцах арга зам
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
