@extends("base")
  @section('content')
  <div id="header"></div>
  <div class="container">
    <form action="{{route('login')}}" method="POST">
      @csrf
       <div id="login"></div>
    </form>
  </div>
  @endsection
