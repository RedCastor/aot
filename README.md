# AOT

Animate on trigger. Work with animate.css classes

**[Demo][]**

Basic usage
---------------
Install bower package:
```bash
bower install aot --save
```



```html
<main>
  <aot data-aot-delay="1000" data-aot-duration="700">
    <h2 data-aot="slideInRight" class="text-center">My Title</h2>
    <div style="width: 100%;" data-aot="bounceInLeft">
      <div class="callout float-center" style="width: 50%;">
        <p class="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue non ipsum non hendrerit. Proin in nibh eget tortor aliquet fermentum sed in nunc.
        </p>
      </div>
    </div>
    <div class="row" data-aot="flipInX" data-aot-duration="1500" data-aot-delay="1500" >
      <button class="button primary float-center" >Read More</button>
    </div>
  </aot>
</main>
<script>
  //Init default selector ('aot')
  document.querySelector('main').AOTinitAll();
  document.querySelector('main').AOTanimateAll();
</script>
```


```html
<section class="my-section">
    <h2 data-aot="slideInRight" data-aot-duration="1000" data-aot-delay="1000" class="text-center">
        My Title
    </h2>
    <p data-aot="slideInRight" data-aot-duration="1000" data-aot-delay="2000" class="text-center">
        My Description
    </p>
    <p data-aot="slideInRight" data-aot-duration="1500" data-aot-delay="2500" class="text-center">
        <button  class="button primary">Read More</button>
    </p>
</section>
<script>
    //Init selector
    document.AOTinitAll('.my-section',
    {
      duration: 600,
      delay: 100,
    });
    
    
    //Do Animation
    document.AOTanimateAll('.my-section', true);
    
    //Hide Animation
    document.AOTanimateAll('.my-section', false);
</script>
```


### 🔥 Advanced settings

These settings can be set both on init element default "aot" tag, or as default while initializing script (in options object without `data-` part and camelCase).

| Attribute | Description | Example value | Default value |
|---------------------------|-------------|---------------|---------|
| *`data-aot-timeout`* | *do animation after timeout | 600 | 0 |
| *`data-aot-timeout-once`* | *Only one timeout | false | true |
| *`data-aot-duration`* | *Duration of animation (ms) | 600 | 400 |
| *`data-aot-delay`* | *Delay animation (ms) | 300 | 0 |
| *`data-aot-class`* | *Class string to animate | | 'aot-animate' |
| *`data-aot-class-out`* | *Class string animate false | | 'aot-hide' |


These settings can be set both on certain elements.

| Attribute | Description | Example value | Default value |
|---------------------------|-------------|---------------|---------|
| *`data-aot`* | *Animation Class from animate.css | 'slideInRight' | '' |
| *`data-aot-duration`* | *Duration of animation (ms) | 600 | 400 |
| *`data-aot-delay`* | *Delay animation (ms) | 300 | 0 |
| *`data-aot-once`* | *Choose wheter animation should fire once | true | false |


[Demo]: http://redcastor.github.io/aot/demo/
