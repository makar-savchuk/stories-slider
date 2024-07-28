import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { EffectCube } from 'swiper/modules';

import { StoriesSlider, Stories, Story } from '../../dist/stories-slider-react';
import '../../dist/stories-slider.scss';

import Post from './Post.jsx';
import '../core/main.scss';

export default function App() {
  const storiesSliderRef = useRef(null);

  const openUserStories = (userIndex) => {
    const storiesSlider = storiesSliderRef.current;
    // add "in" class (used in demo for animated appearance)
    storiesSlider.el.classList.add('stories-slider-in');
    // enable slider (as we passed enabled: false initially)
    storiesSlider.enable();
    // slide to specific user's stories
    storiesSlider.slideTo(userIndex, 0);
  };

  const onCloseButtonClick = () => {
    const storiesSlider = storiesSliderRef.current;
    // disable slider as we don't need it autoplay stories while it is hidden
    storiesSlider.disable();
    // add "out" class (used in demo for animated disappearance)
    storiesSlider.el.classList.add('stories-slider-out');
  };

  useEffect(() => {
    const storiesSlider = storiesSliderRef.current;
    if (storiesSlider) {
      // when slider became hidden we need to remove "in" and "out" class to return it initial state
      storiesSlider.el.addEventListener('animationend', () => {
        if (storiesSlider.el.classList.contains('stories-slider-out')) {
          storiesSlider.el.classList.remove('stories-slider-in');
          storiesSlider.el.classList.remove('stories-slider-out');
        }
      });
    }
  }, [storiesSliderRef]);

  // stories data
  const storiesData = [
    {
      user: {
        avatar: 'avatars/mark.jpg',
        name: 'mark_johnson',
      },
      stories: [
        {
          date: '21h',
          image: 'images/food-1.jpg',
        },
        {
          date: '12h',
          image: 'images/food-2.jpg',
        },
        {
          date: '2h',
          video: 'video.mp4',
        },
        {
          date: '30m',
          image: 'images/food-3.jpg',
        },
        {
          date: '15m',
          image: 'images/food-4.jpg',
        },
      ],
    },
    {
      user: {
        avatar: 'avatars/malenia.jpg',
        name: 'malenia',
      },
      stories: [
        {
          date: '5h',
          image: 'images/elden-1.jpg',
        },
        {
          date: '45m',
          image: 'images/elden-2.jpg',
        },
        {
          date: '5m',
          image: 'images/elden-3.jpg',
        },
      ],
    },
    {
      user: {
        avatar: 'avatars/john.jpg',
        name: 'john1986',
      },
      stories: [
        {
          date: '15h',
          image: 'images/vacation-1.jpg',
        },
        {
          date: '10h',
          image: 'images/vacation-2.jpg',
        },
        {
          date: '10h',
          image: 'images/vacation-3.jpg',
        },
        {
          date: '8h',
          image: 'images/vacation-4.jpg',
        },
        {
          date: '47m',
          image: 'images/vacation-5.jpg',
        },
      ],
    },
  ];

  return (
    <>
      <div className="demo-app">
        {/* Demo content */}
        <div className="demo-title">
          <img src="images/logo.png" width="156" />
        </div>
        <div className="demo-stories">
          {storiesData.map((userStories, userStoriesIndex) => (
            <a
              key={userStoriesIndex}
              href="#"
              onClick={() => openUserStories(userStoriesIndex)}
            >
              <span className="demo-stories-avatar">
                <img src={userStories.user.avatar} alt="" />
              </span>
              <span className="demo-stories-name">{userStories.user.name}</span>
            </a>
          ))}
        </div>

        <Post
          name="mark_johnson"
          avatar="avatars/mark.jpg"
          likesCount="133"
          image="images/food-2.jpg"
          text="The steak turned out great 😊🥩"
          date="3 hours ago"
          onAvatarClick={() => openUserStories(0)}
        />

        <Post
          name="mark_johnson"
          avatar="avatars/mark.jpg"
          likesCount="515"
          image="images/food-1.jpg"
          text="Going to cook some steaks today 🥩. Anyone wants to join?"
          date="8 hours ago"
          onAvatarClick={() => openUserStories(0)}
        />

        <Post
          name="malenia"
          avatar="avatars/malenia.jpg"
          likesCount="80"
          image="images/elden-2.jpg"
          text="Getting close to beat the Elden Ring. The game is truly amazing
          ⚔️"
          date="9 hours ago"
          onAvatarClick={() => openUserStories(1)}
        />

        <Post
          name="john1986"
          avatar="avatars/john.jpg"
          likesCount="8129"
          image="images/vacation-1.jpg"
          text="Maldives 🌊🐚🏄‍♂️"
          date="15 hours ago"
          onAvatarClick={() => openUserStories(2)}
        />
      </div>

      {/* Stories Slider */}
      <StoriesSlider
        Swiper={Swiper}
        EffectCube={EffectCube}
        enabled={false}
        autoplayDuration={5000}
        onSlidesIndexesChange={(mainIndex, subIndex) =>
          console.log({ mainIndex, subIndex })
        }
        onStoriesSlider={(instance) => {
          storiesSliderRef.current = instance;
        }}
      >
        {storiesData.map((userStories, userStoriesIndex) => (
          <Stories key={userStoriesIndex}>
            {userStories.stories.map((story, storyIndex) => (
              <Story
                key={storyIndex}
                userLink="#"
                avatar={<img src={userStories.user.avatar} />}
                name={userStories.user.name}
                date={story.date}
                closeButton
                onCloseButtonClick={onCloseButtonClick}
              >
                {story.video ? (
                  <video src={story.video} playsInline preload="metadata" />
                ) : (
                  <img src={story.image} />
                )}
              </Story>
            ))}
          </Stories>
        ))}
      </StoriesSlider>
    </>
  );
}
