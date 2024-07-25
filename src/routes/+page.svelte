<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import prettyBytes from 'pretty-bytes';
</script>

<div>
	<h1>IFS</h1>
	<h6>{new Date().toDateString()}</h6>
</div>
<table>
	<thead>
		<tr>
			<th class="min"></th>
			<th>Name</th>
			<th>Size</th>
			<th>Modified Time</th>
		</tr>
	</thead>
	<tbody>
		{#each data.files as f}
			{#if f.isDirectory === false}
				<tr>
					<i>description</i>
					<td><a href={f.name}>{f.name}</a></td>
					<td>{prettyBytes(f.size)}</td>
					<td>{new Date(f.modified).toLocaleString()}</td>
				</tr>
			{:else}
				<tr>
					<i>folder_open</i>
					<td><a href={f.name}>{f.name}</a></td>
					<td></td>
					<td>{new Date(f.modified).toLocaleString()}</td>
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
