<!DOCTYPE html>
<html>
<head>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
<style>
table {
  font-family: arial, sans-serif;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  border-radius: 5px;
}

th {
    background-color: #A5DBBE;
    font-family: "Ubuntu", sans-serif;
    font-weight: 300;
    font-style: normal;
}

/* tr:nth-child(even) {
  background-color: #dddddd;
} */

h2 {
    color:#497DDC
}

.header {
    display:flex;
    flex-direction:row;
    flex-wrap: nowrap;
}
</style>
</head>
<body>

<div classname="header">
    <img 
        src="{{ public_path('images/logo.png') }}"
        alt="Plenitude Education Logo" 
        width="50" 
                />
    <h2>Plenitude Education</h2>
</div>

<p>Planning de {{$formation}}</p>


<table>
  <tr>
    <th>Date</th>
    <th>Heure de début</th>
    <th>Heure de fin</th>
    <th>Module/Atelier</th>
    <th>Formateur</th>
    <th>Observations</th>
  </tr>
  
  
  @foreach($seances as $row)
  <tr>
    <td>{{$row["date"]}}</td>
    <td>{{$row["heure_debut"]}}</td>
    <td>{{$row["heure_fin"]}}</td>
    <td>{{ $row["module"] ? $row["module"]:$row["atelier"] }}</td>
    <td>{{$row["formateur"]}}</td>
    <td>{{$row["Observations"]}}</td>
  </tr>
  @endforeach
</table>

</body>
</html>

