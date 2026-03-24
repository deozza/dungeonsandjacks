<script lang="ts">
  interface Props {
    character: any,
    onclick
  };

  let { character, onclick }: Props = $props();
</script>


<div class="flex flex-col items-center justify-between border rounded-xl h-full w-3/12 p-4 transform transition duration-500 hover:scale-105 group">
  <div class="text-center">
    <h2 class="h2">{character.NameComponent.content}</h2>
    <p class="italic">{character.DescriptionComponent.content}</p>
  </div>
	<button {onclick} class="btn btn-lg preset-outlined-primary-500 group-hover:preset-filled-primary-500" >Select</button>
</div>

