@extends("base")
@section("content")
<style>
  body {
    background-color: #f6f6f6;
  }
  .container {
    max-width: 600px;
    margin-top: 30px;
  }
  .message-container {
    margin-top: 20px;
  }
  .message {
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 8px;
    color: white;
  }
  .message.received {
    text-align: right;
  }
  textarea.form-control {
    height: 38px;
    border-radius: 8px 20px 20px 8px;
    overflow-y: auto;
    margin-right: 5px;
  }
  .btn-primary {
    border-radius: 20px;
  }
  header {
    background-color: rgba(0, 0, 0, 0.8);
    padding: 10px;
    border-radius: 10px;
    color: white;
    margin-bottom: 20px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }
  header h1 {
    margin-bottom: 0;
  }
  .join-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 20px;
    cursor: pointer;
    display: block;
    margin: 10px auto;
  }
</style>
</head>
<body>
<div class="container">
  <header class="mb-4">
    <h1>Canal Telegram</h1>
  </header>
  <div class="message-container">
    @php
    $colors = [
        '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFF5',
        '#F5FF33', '#FF5733', '#B6FF33', '#D833FF', '#FF8F33'
    ];

    function getUserColor($userId, $colors) {
        return $colors[$userId % count($colors)];
    }
    @endphp
    @foreach ($messages as $message)
      @php
      $color = getUserColor($message->user_id, $colors);
      @endphp
      <div class="message" style="background-color: {{ $color }};">
        {{$message->contenu}}
      </div>
    @endforeach
  </div>
  @if($join === true)
  <form class="mt-4" action="{{ route('channel.addMessages', ['Channel' => $channel]) }}" method="POST">
    @csrf
    <div class="input-group">
      <textarea class="form-control form-control-sm" id="message" rows="1" placeholder="Votre message" name="contenu"></textarea>
      <div class="input-group-append">
        <button type="submit" class="btn btn-primary">Envoyer</button>
      </div>
    </div>
  </form>
  @endif
  @if($join === false)
  <form id="joinForm" class="mt-2" action="{{ route('channel.addMembers', ['Channel' => $channel]) }}" method="POST">
    @csrf
    <button class="join-button" type="submit">Rejoindre</button>
  </form>
  @endif
</div>

<!-- Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<!-- JavaScript pour envoyer les messages -->
<script>

</script>
@endsection
