@extends("base")
@section("content")
<div id="headerDashboard"></div>
  <div id="Annonce"></div>
  @php
    $id = Auth::id();
   @endphp
 <script>
  window.dash = {
      show: "{{ route('dashboard.show',['user'=>$id]) }}",
      message:"{{Route('dashboard.message',['user'=>$id] )}}",
      annonce:"{{Route('dashboard.annonce',['user'=>$id])}}",
      compte:"{{Route('dashboard.compte',['user'=>$id])}}",
      url:"{{Route('dashboard.publie',['user'=>$id])}}",
  };
</script>
@endsection