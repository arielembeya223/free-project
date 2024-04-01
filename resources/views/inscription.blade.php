@extends("base")
  @section('content')
  <div id="header"></div>
  <div class="container mt-4">
    <form action="{{route('registration')}}" method="POST" style="width: 300px; margin: 0 auto;">
      @csrf
       <div id="registration"></div>
    </form>
  </div>
  @endsection
