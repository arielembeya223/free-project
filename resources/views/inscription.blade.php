@extends("base")
  @section('content')
  <div id="header"></div>
  <div class="container">
    <form action="{{route('registration')}}" method="POST">
      @csrf
       <div id="registration"></div>
    </form>
  </div>
  @endsection
