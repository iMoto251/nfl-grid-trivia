-- College Team and Pro Team
select players.id,players.name,players.college,playerTeams.playedNOR
from players
INNER JOIN playerTeams ON players.id=playerTeams.id
where players.college='LSU' and playerTeams.playedNOR='True';

-- College Team and Stat
select players.id, players.name, players.college, playerStats.careerReceptions
from players
INNER JOIN playerStats ON players.id=playerStats.id
where players.college='LSU' and playerStats.careerReceptions > 10;

-- 2 NFL Teams
select id, name, playedNOR, playedTAM
from playerTeams
where playedNOR='True' and playedTAM='True';