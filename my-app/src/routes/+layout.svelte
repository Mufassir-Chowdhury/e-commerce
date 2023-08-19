<script>
    import "../app.css";
    export let data;
  </script>
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="/" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://i.ibb.co/3fNhx9p/258d0197-fda3-41b3-b00a-8e8c55d3f8cd.jpg" alt="">
        </a>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <a href="/" class="text-sm font-semibold leading-6 text-gray-900">All products</a>
        <a href="/history" class="text-sm font-semibold leading-6 text-gray-900">History</a>
        <a href="/about" class="text-sm font-semibold leading-6 text-gray-900">About us</a>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      {#if data.loggedIn}
        <form method="POST" action="/signout">
          <button class="text-sm font-semibold leading-6 text-gray-900">Log out <span aria-hidden="true">&rarr;</span></button>
        </form>
      {/if}
      </div>
    </nav>
    
  </header>
  
  <slot />