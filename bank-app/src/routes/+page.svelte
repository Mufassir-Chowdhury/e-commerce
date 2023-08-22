<script>
    export let data;
</script>

<h1 class="text-center text-3xl font-semibold text-gray-900 dark:text-white p-10 mt-40">You are - {data.email}</h1>

<h2 class="text-center text-xl font-semibold text-gray-900 dark:text-white">Your balance - ${data.balance}</h2>

<div class="flex justify-center p-10">
    <form method="POST" action="/signout">
        <button class="w-40 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Logout</button>
    </form>
</div>