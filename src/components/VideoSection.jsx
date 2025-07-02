
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { videoService } from '../services/videoService';
import Autoplay from "embla-carousel-autoplay";

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await videoService.getVideos();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      // Fallback to default video if fetch fails
      setVideos([{
        id: 'default',
        title: 'Discover the 93cars Difference',
        embedUrl: 'https://www.youtube.com/embed/aVLYr_E1tJQ',
        description: 'Learn about our services'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-5">
        <div className="container">
          <div className="text-center">Loading videos...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h2 className="fw-bold mb-4">Discover the 93cars Difference</h2>
            <p className="text-muted">
              At 93cars, we're dedicated to simplifying your car search. As a premier car listing company, we don't sell cars directly. Instead, we provide a comprehensive platform where you can explore a wide variety of vehicles. We offer detailed information, features, and specifications for every car listed, empowering you to make an informed decision. Our goal is to connect you with your ideal car by providing all the necessary details in one place.
            </p>
          </div>
          <div className="col-lg-6">
            {videos.length > 0 ? (
              <Carousel 
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 30000,
                  }),
                ]}
              >
                <CarouselContent>
                  {videos.map((video) => (
                    <CarouselItem key={video.id}>
                      <div className="ratio ratio-16x9 rounded overflow-hidden shadow-lg">
                        <iframe
                          src={video.embedUrl}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      {video.title && (
                        <div className="mt-3 text-center">
                          <h6 className="fw-semibold">{video.title}</h6>
                          {video.description && (
                            <p className="text-muted small">{video.description}</p>
                          )}
                        </div>
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {videos.length > 1 && (
                  <>
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/aVLYr_E1tJQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
