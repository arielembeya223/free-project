@extends("base")
@section("content")
<div id="headerDashboard"></div>
<div id="Profil"></div>
  @php
    $id = Auth::id();
   @endphp
<script>
  window.dash = {
      show: "{{ route('dashboard.show',['user'=>$id]) }}",
      message:"{{Route('dashboard.message',['user'=>$id] )}}",
      annonce:"{{Route('dashboard.annonce',['user'=>$id])}}",
      compte:"{{Route('dashboard.compte',['user'=>$id])}}",
      add:"{{Route('dashboard.addContact',['user'=>$id])}}"
  };
</script>
@endsection