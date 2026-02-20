"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Priya S.",
    rating: 5,
    review: "The ghee roast masala is a game-changer! Tastes just like the one from my favorite restaurant in Mangalore. So happy I found this store.",
  },
  {
    name: "Rajesh K.",
    rating: 5,
    review: "Finally, authentic Karavali products in Bangalore. The jackfruit chips were crispy and fresh. Will definitely be a repeat customer.",
  },
  {
    name: "Anjali M.",
    rating: 4,
    review: "I ordered the tender mango pickle, and it was delicious. The packaging was very secure, and the delivery was prompt. A bit pricey, but worth it.",
  },
  {
    name: "Suresh P.",
    rating: 5,
    review: "Loved the Neer Dosa batter. It made my Sunday breakfast so much easier and tastier. It felt just like homemade dosa. Highly recommended!",
  },
   {
    name: "Deepa V.",
    rating: 5,
    review: "The cold-pressed coconut oil is of excellent quality. The aroma itself tells you how pure it is. I use it for cooking and for my hair.",
  },
];

const QuoteIcon = () => (
    <svg
      width="40"
      height="28"
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto h-7 w-10 text-muted-foreground/20"
    >
      <path
        d="M12.1866 27.0399C9.33329 27.0399 6.81329 26.0466 4.62662 24.0599C2.43995 22.0732 1.34662 19.5732 1.34662 16.5599C1.34662 14.1199 1.85329 11.8399 2.86662 9.71992C3.87995 7.59992 5.51995 5.33325 7.78662 2.91992L11.8133 7.03992C10.0533 8.91992 8.78662 10.6399 7.99995 12.1999C7.21329 13.7599 6.81995 15.0399 6.81995 16.0399C6.81995 16.7199 6.94662 17.2732 7.21329 17.6999C7.47995 18.1266 7.91995 18.3399 8.53329 18.3399H13.6533L12.1866 27.0399ZM35.8533 27.0399C32.9999 27.0399 30.4799 26.0466 28.2933 24.0599C26.1066 22.0732 25.0133 19.5732 25.0133 16.5599C25.0133 14.1199 25.5199 11.8399 26.5333 9.71992C27.5466 7.59992 29.1866 5.33325 31.4533 2.91992L35.48 7.03992C33.72 8.91992 32.4533 10.6399 31.6666 12.1999C30.88 13.7599 30.4866 15.0399 30.4866 16.0399C30.4866 16.7199 30.6133 17.2732 30.88 17.6999C31.1466 18.1266 31.5866 18.3399 32.2 18.3399H37.32L35.8533 27.0399Z"
        fill="currentColor"
      />
    </svg>
  );

export default function ReviewCarousel() {
  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group"
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-scroll group-hover:[animation-play-state:paused]">
        {[...reviews, ...reviews].map((review, index) => {
           return (
            <li key={index} className="flex-shrink-0 w-80 p-6 text-center">
                <QuoteIcon />
                <p className="text-sm text-muted-foreground my-4">"{review.review}"</p>
                <div className="text-left">
                    <p className="font-bold">{review.name}</p>
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/50")} />
                        ))}
                    </div>
                </div>
            </li>
        )})}
      </ul>
    </div>
  );
}
