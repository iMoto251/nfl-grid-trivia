-- College Team and Pro Team
select players.id,players.name,players.college,playerTeams.playedBUF
from players
INNER JOIN playerTeams ON players.id=playerTeams.id
where players.college='Air Force' and playerTeams.playedBUF='True';

-- College Team and Stat
select players.id, players.name, players.college, playerStats.careerReceptions
from players
INNER JOIN playerStats ON players.id=playerStats.id
where players.college='LSU' and playerStats.careerReceptions > 10;

-- 2 NFL Teams
select id, name, playedNOR, playedTAM
from playerTeams
where playedNOR='True' and playedTAM='True';

-- NFL and Stat
SELECT playerStats.name FROM playerStats INNER JOIN playerTeams ON playerStats.id=playerTeams.id WHERE playerTeams.playedARI='True' and playerStats.bestPassing<3000;