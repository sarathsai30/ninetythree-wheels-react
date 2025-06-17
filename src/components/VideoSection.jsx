
import React from 'react';

const VideoSection = () => {
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
            <div className="ratio ratio-16x9 rounded overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/aVLYr_E1tJQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
