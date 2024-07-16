<script>
  export let data;
</script>

<div class="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
  <div class="container mx-auto px-4 py-8">
    <div class="bg-zinc-100 dark:bg-zinc-700 p-6 rounded-lg shadow">
      <h3 class="text-xl font-bold">Tournament of Champions 2023</h3>
      <p class="mb-4">Join our biggest tournament yet and compete for the top spot!</p>
      <div class="flex justify-between items-center mb-4">
        <div>
          <p class="font-semibold">Date:</p>
          <p class="text-zinc-600 dark:text-zinc-400">April 15, 2023</p>
        </div>
        <div>
          <p class="font-semibold">Game:</p>
          <p class="text-zinc-600 dark:text-zinc-400">League of Legends</p>
        </div>
      </div>
      <div class="flex justify-between items-center mb-4">
        <button class="bg-blue-500 text-white p-2 rounded-lg mr-2">Register Now</button>
        <a href="#view-more" class="text-blue-500 hover:underline">View More Details</a>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    <div class="bg-zinc-100 dark:bg-zinc-700 p-6 rounded-lg shadow flex items-center space-x-4">
      <img class="w-16 h-16" src="https://placehold.co/160" alt="Game 1" />
      <div>
        <h3 class="text-xl font-bold">League of Legends</h3>
        <p class="text-zinc-600 dark:text-zinc-400">Compete in the most popular MOBA.</p>
      </div>
    </div>
  </div>

  <h2 class="text-2xl font-semibold mb-4 text-center">Leaderboard</h2>
  <div class="overflow-x-auto relative">
    <table class="w-full text-sm text-left dark:text-zinc-200">
      <thead class="bg-zinc-100 dark:bg-zinc-700">
        <tr>
          <th scope="col" class="px-6 py-3">Rank</th>
          <th scope="col" class="px-6 py-3">Player</th>
          <th scope="col" class="px-6 py-3">Tokens</th>
        </tr>
      </thead>
      <tbody>
        {#each data.users || [] as user, index}
          <tr class="bg-white dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-700">
            <td class="px-6 py-4 font-medium whitespace-nowrap">{index + 1}</td>
            <td class="px-6 py-4">{user.username}</td>
            <td class="px-6 py-4">{user.token}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
