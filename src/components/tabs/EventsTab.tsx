import { Event } from '../../contexts/DataContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Props {
  events: Event[];
}

export default function EventsTab({ events }: Props) {
  const isNewEvent = (createdAt: string): boolean => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 3;
  };

  const sortedEvents = [...events].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-3xl">Эвент ба мэдээллүүд</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {isNewEvent(event.createdAt) && (
                  <Badge className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white animate-pulse">
                    ШИНЭ
                  </Badge>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString('mn-MN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl mb-3 line-clamp-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(event.createdAt).toLocaleDateString('mn-MN')} нэмэгдсэн
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4"></div>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Одоогоор эвент байхгүй байна
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
