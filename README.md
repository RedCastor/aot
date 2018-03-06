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
<script>
    //Init selector
    document.AOTinitAll('.my-section',
    {
      duration: 600,
      delay: 100,
    });
    
    
    document.AOTanimateAll('.my-section', true);
</script>

<section class="my-section">
    <h2 data-aot="slideInRight" data-aot-duration="1000" data-aot-delay="1000" class="text-center">
        My Title
    </h2>
    <p data-aot="slideInRight" data-aot-duration="1000" data-aot-delay="2000"class="text-center">
        My Description
    </p>
    <p data-aot="slideInRight" data-aot-duration="1500" data-aot-delay="2500" class="text-center">
        <button  class="button primary">Read More</button>
    </p>
</section>
```

[Demo]: http://redcastor.github.io/aot/demo/
