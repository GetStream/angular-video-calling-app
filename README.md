![Blog-Using Angular Signals to build a Video Calling App-2400x1350px](https://github.com/GetStream/angular-video-calling-app/assets/12433593/3a6e9f62-525f-4871-b2c2-5458d9733218)

# Building a Video Calling App using Angular Signals (+ adding RxJS interoperability)

Angular Signals was introduced at Google IO 2023. It's a concept for adding reactivity to Angular applications.

They consist of the following main building blocks:

1. `signal`: a wrapper around a value that notifies consumers whenever their value changes
2. `computed`: a signal that derives its value from other signals
3. `effect`: an operation that runs whenever one or more signal values change
   (smart enough to detect which signals are read inside of the effect)

The repo makes use of these concepts to build a video-calling application. This was first introduced in [this YouTube video](https://youtu.be/lb_6vUfVAr8) where there are more detailed samples and explanations.

Feel free to watch this and/or explore the code further. If there's any feedback, reach out to our [company account](https://twitter.com/getstream_io) or [Stefan](https://twitter.com/stefanjblos) directly.

While you're at it, don't forget to ⭐️ this repo and share with your friends.
