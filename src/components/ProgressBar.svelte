<script>
  import { progressBarWidth } from "../store";
</script>

<div class="shadow w-full bg-red-100 h-6 bottom-0">
  <div
    class="bg-infer h-6 text-xs flex items-center justify-center py-1 text-center"
    style="width: {$progressBarWidth}%">
    {$progressBarWidth}%
  </div>
</div>
