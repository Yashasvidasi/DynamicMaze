from flask import Flask, request, jsonify
from flask_cors import CORS
from queue import PriorityQueue

app = Flask(__name__)
CORS(app)

playerloc = []
exitloc = []
hghost = []
vghost = []
dghost = []
odghost = []
facta = "False"
factb = "False"
factd = "False"

class State:
    def __init__(self, player, exit, ghosts):
        self.player = player
        self.ghosts = ghosts
        self.exit = exit
        self.path = []
        self.cost = 0
        self.heuristic_cost = self.heuristic()
    
    def heuristic(self):
        player_x, player_y = self.player
        exit_x, exit_y = self.exit
        
        distance_to_exit = abs(player_x - exit_x) + abs(player_y - exit_y)
        min_distance_to_ghost = float('inf')
        
        for ghosts_pos in self.ghosts:
            for ghost in ghosts_pos:
                distance_to_ghost = abs(player_x - ghost[1]) + abs(player_y - ghost[2])
                min_distance_to_ghost = min(min_distance_to_ghost, distance_to_ghost)
                
        w1 = 2.7
        w2 = 1.9
        return w1*distance_to_exit + w2*(1/(min_distance_to_ghost+1))
    
    def __lt__(self, other):
        return (self.cost + self.heuristic_cost) < (other.cost + other.heuristic_cost)



def move_horizontal(ghosts):
    newloc = []
    for l in ghosts:
        a = l.copy()
        if a[1] == 7:
            a[0] = 0
        elif a[1] == 0:
            a[0] = 1

        if(a[0]==1):
            a[1]+=1
        else:
            a[1]-=1

        
        newloc.append(a)
    return newloc

def move_vertical(ghosts):
    newloc = []
    for l in ghosts:
        a = l.copy()
        if a[2] == 7:
            a[0] = 0
        elif a[2] == 0:
            a[0] = 1

        if(a[0]==1):
            a[2]+=1
        else:
            a[2]-=1

        newloc.append(a)
    return newloc

def move_diagonal_upright(ghosts):
    newloc = []
    for l in ghosts:
        a = l.copy()

        if a[2] == 0 or a[1] == 7:
            a[0] = 0
        if a[2] == 7 or a[1] == 0:
            a[0] = 1


        if(a[0]==1 and (a[2]-1 != -1 and a[1]+1 != 8)):
            a[2]-=1
            a[1]+=1
        elif(a[0]==0 and (a[2]+1 != 8 and a[1]-1 != -1)):
            a[2]+=1
            a[1]-=1

        
        newloc.append(a)
    return newloc

def move_diagonal_bottomright(ghosts):
    

    newloc = []
    for l in ghosts:
        a = l.copy()
        if a[2] == 7 or a[1] == 7:
            a[0] = 0
        if a[2] == 0 or a[1] == 0:
            a[0] = 1



        if(a[0]==1 and (a[2]+1 != 8 and a[1]+1 != 8)):
            a[2]+=1
            a[1]+=1
        elif(a[0]==0 and (a[2]-1 != -1 and a[1]-1 != -1)):
            a[2]-=1
            a[1]-=1

        
        newloc.append(a)
    return newloc

def move_ghosts(ghosts):
    newh = []
    newv = []
    newd = []
    newod = []
    newh = move_horizontal(ghosts[0])
    newv = move_vertical(ghosts[1])
    newd = move_diagonal_upright(ghosts[2])
    newod = move_diagonal_bottomright(ghosts[3])
    new = [newh, newv, newd, newod]
    return new


def get_actions(state):
    actions = []   
    for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
        new_player = [state.player[0] + dx, state.player[1] + dy]
        if 0 <= new_player[0] < 8 and 0 <= new_player[1] < 8:
            actions.append(new_player)
    return actions

def checker(pos, ghosts):
    for gh in ghosts:
        for g in gh:
            if(pos[0] == g[1] and pos[1] == g[2]):
                return True
    return False

def checkpass(pos_new, pos_old, ghosts_new, ghosts_old):
    for gh in range(4):
        for g in range(3): 
            if ((pos_new[0] == ghosts_old[gh][g][1] and pos_new[1] == ghosts_old[gh][g][2]) and 
                (pos_old[0] == ghosts_new[gh][g][1] and pos_old[1] == ghosts_new[gh][g][2])):
                return True
    return False


def get_children(state):
    children = []
    actions = get_actions(state)
    new = move_ghosts(state.ghosts)
    for a in actions:
        if(checker(a, new) or checkpass(a, state.player, new, state.ghosts)):
            continue
        newc = State(a, state.exit, new)
        newc.path = state.path + [state.player]
        children.append(newc)
    return children

def get_children_dead(state):
    children = []
    actions = get_actions(state)
    new = move_ghosts(state.ghosts)
    for a in actions:
        if(checker(a, new) or checkpass(a, state.player, new, state.ghosts)):
            newc = State(a, state.exit, new)
            newc.path = state.path + [state.player]
            children.append(newc)
    return children

def get_children_nog(state):
    children = []
    actions = get_actions(state)
    new = move_ghosts(state.ghosts)
    for a in actions:
        newc = State(a, state.exit, new)
        newc.path = state.path + [state.player]
        children.append(newc)
    return children


def find_nearest_ghost(initial_state, x):
    frontier = [initial_state]
    visited = []
    global facta, factb, factd
    
    while frontier != []:
        if(x == 'a'):
            frontier.sort()
            current_state = frontier.pop(0)
        
        elif(x == 'b'):
            frontier.sort(key = compare)
            current_state = frontier.pop(0)
        else:
            current_state = frontier.pop(-1) 
        visited.append(tuple(current_state.player))
        
        if (get_children_dead(current_state) != []):
            current_state = get_children_dead(current_state)[0]
            print("Found the nearest ghost!", x)
            current_state.path = current_state.path + [current_state.player]
            
            if(x == 'a'):
                facta = "True"
            
            elif(x == 'b'):
                factb = "True"
            else:
                factd = "True"
            return current_state

        for child_state in get_children_nog(current_state):
            if tuple(child_state.player) not in visited:
                frontier.append(child_state)




def a_star_search(initial_state):
    frontier = PriorityQueue()
    frontier.put(initial_state)

    
    while not frontier.empty():
        current_state = frontier.get()
       
        if current_state.player == current_state.exit:
            print("oakya")
            current_state.path = current_state.path + [current_state.player]
            return current_state
        
        for child_state in get_children(current_state):
            child_state.cost = len(child_state.path)*1.5
            frontier.put(child_state)
    return find_nearest_ghost(initial_state, 'a')

def compare(d):
    return d.heuristic_cost

def bfs(initial_state):
    frontier = [initial_state]
    

    while frontier != []:
        frontier.sort(key = compare)
        current_state = frontier.pop(0)


        if current_state.player == current_state.exit:
            print("oakyb")
            current_state.path = current_state.path + [current_state.player]
            return current_state
        
        for child_state in get_children(current_state):
            child_state.cost = len(child_state.path)
            frontier.append(child_state)
    return find_nearest_ghost(initial_state, 'b')



def dfs(initial_state):
    frontier = [initial_state]
    visited = []

    while frontier != []:
        current_state = frontier.pop(-1)
        visited.append(tuple(current_state.player))

        if current_state.player == current_state.exit:
            print("oakyd")
            current_state.path = current_state.path + [current_state.player]
            return current_state
        
        for child_state in get_children(current_state):
            if tuple(child_state.player) not in visited:
                child_state.cost = len(child_state.path)*5
                frontier.append(child_state)

    return find_nearest_ghost(initial_state, 'd')


def getworld(exit, path, ghosts):
    solution = []
    newp = ghosts
    for a in path:
        newl = reverse_caller(newp)
        solution.append([a,newl])
        newp = move_ghosts(newp)
    
    
    return solution


def caller():
    for a in hghost:
        a.insert(0,1)
    for a in vghost:
        a.insert(0,1)
    for a in dghost:
        a.insert(0,1)
    for a in odghost:
        a.insert(0,1)

def reverse_caller(list):
    total = []
    new = []
    for a in list[0]:
        l = a.copy()
        l.pop(0)
        new.append(l)
    total.append(new)
    new = []
    for a in list[1]:
        l = a.copy()
        l.pop(0)
        new.append(l)
    total.append(new)
    new = []
    for a in list[2]:
        l = a.copy()
        l.pop(0)
        new.append(l)
    total.append(new)
    new = []
    for a in list[3]:
        l = a.copy()
        l.pop(0)
        new.append(l)
    total.append(new)
    return total

def baller():
    ghosts = [hghost, vghost, dghost, odghost]
    inital_ghosts = ghosts.copy()
    player_position = playerloc
    exit_position = exitloc
    initial_state = State(player_position, exit_position, ghosts)
    result_state = bfs(initial_state)
    sol = getworld(exit_position, result_state.path, inital_ghosts)
    x = difficult_function(sol, inital_ghosts)
    return x
    

def saller():
    ghosts = [hghost, vghost, dghost, odghost]
    inital_ghosts = ghosts.copy()
    player_position = playerloc
    exit_position = exitloc
    initial_state = State(player_position, exit_position, ghosts)
    result_state = a_star_search(initial_state)
    sol = getworld(exit_position, result_state.path, inital_ghosts)
    x = difficult_function(sol, inital_ghosts)
    return x

def get_ghosts(x,y,z):
    
    if(len(x[0])>=len(y[0])):
        if(len(x[0])>=len(z[0])):
            return x
        else:
            return z
    else:
        if len(y[0])>=len(z[0]):
            return y
        else:
            return z


def daller():
    ghosts = [hghost, vghost, dghost, odghost]
    inital_ghosts = ghosts.copy()
    player_position = playerloc
    exit_position = exitloc
    initial_state = State(player_position, exit_position, ghosts)
    result_state = dfs(initial_state)
    sol = getworld(exit_position, result_state.path, inital_ghosts)
    x = difficult_function(sol, inital_ghosts)
    return x

def difficult_function(sol, inital_ghosts):
    
    x_cord = []
    y_cord = []
    x_hg1 = []
    x_hg2 = []
    x_hg3 = []
    y_hg1 = []
    y_hg2 = []
    y_hg3 = []
    x_vg1 = []
    x_vg2 = []
    x_vg3 = []
    y_vg1 = []
    y_vg2 = []
    y_vg3 = []
    x_dg1 = []
    x_dg2 = []
    x_dg3 = []
    y_dg1 = []
    y_dg2 = []
    y_dg3 = []
    x_odg1 = []
    x_odg2 = []
    x_odg3 = []
    y_odg1 = []
    y_odg2 = []
    y_odg3 = []

    inital = sol[0][0]
    for a in sol:

        y_cord.append(a[0][0] * 76 - inital[0]*76)
        x_cord.append(a[0][1] * 76 - inital[1] *76)
        

        y_hg1.append(a[1][0][0][0] * 76- inital_ghosts[0][0][1]*76)
        x_hg1.append(a[1][0][0][1] * 76- inital_ghosts[0][0][2]*76)

        y_hg2.append(a[1][0][1][0] * 76 - inital_ghosts[0][1][1]*76)
        x_hg2.append(a[1][0][1][1] * 76- inital_ghosts[0][1][2]*76)

        y_hg3.append(a[1][0][2][0] * 76-inital_ghosts[0][2][1]*76)
        x_hg3.append(a[1][0][2][1] * 76-inital_ghosts[0][2][2]*76)
        

        y_vg1.append(a[1][1][0][0] * 76- inital_ghosts[1][0][1]*76)
        x_vg1.append(a[1][1][0][1] * 76-inital_ghosts[1][0][2]*76)
        

        y_vg2.append(a[1][1][1][0] * 76-inital_ghosts[1][1][1]*76)
        x_vg2.append(a[1][1][1][1] * 76-inital_ghosts[1][1][2]*76)

        y_vg3.append(a[1][1][2][0] * 76-inital_ghosts[1][2][1]*76)
        x_vg3.append(a[1][1][2][1] * 76-inital_ghosts[1][2][2]*76)
        

        y_dg1.append(a[1][2][0][0] * 76-inital_ghosts[2][0][1]*76)
        x_dg1.append(a[1][2][0][1] * 76-inital_ghosts[2][0][2]*76)
        

        y_dg2.append(a[1][2][1][0] * 76-inital_ghosts[2][1][1]*76)
        x_dg2.append(a[1][2][1][1] * 76-inital_ghosts[2][1][2]*76)
        

        y_dg3.append(a[1][2][2][0] * 76-inital_ghosts[2][2][1]*76)
        x_dg3.append(a[1][2][2][1] * 76-inital_ghosts[2][2][2]*76)
        

        y_odg1.append(a[1][3][0][0] * 76-inital_ghosts[3][0][1]*76)
        x_odg1.append(a[1][3][0][1] * 76-inital_ghosts[3][0][2]*76)
        
  
        y_odg2.append(a[1][3][1][0] * 76-inital_ghosts[3][1][1]*76)
        x_odg2.append(a[1][3][1][1] * 76-inital_ghosts[3][1][2]*76)
        
        
        y_odg3.append(a[1][3][2][0] * 76-inital_ghosts[3][2][1]*76)
        x_odg3.append(a[1][3][2][1] * 76-inital_ghosts[3][2][2]*76)

    return [x_cord, y_cord, [[x_hg1, x_hg2, x_hg3],[y_hg1, y_hg2, y_hg3]], [[x_vg1, x_vg2, x_vg3],[y_vg1, y_vg2, y_vg3]], [[x_dg1, x_dg2, x_dg3],[y_dg1, y_dg2, y_dg3]], [[x_odg1, x_odg2, x_odg3],[y_odg1, y_odg2, y_odg3]]]


@app.route('/add-numbers', methods=['POST'])
def add_numbers():

    global playerloc, exitloc, hghost, vghost, dghost, odghost, facta, factb, factd
    data = request.json
    playerloc = data.get('num1')
    exitloc = data.get('num2')
    hghost = data.get('array1')
    vghost = data.get('array2')
    dghost = data.get('array3')
    odghost = data.get('array4')
    caller()
    facta = "False"
    factb = "False"
    factd = "False"
    if playerloc is None or exitloc is None:
        return jsonify({'error': 'Missing data'}), 400
    try:
        result = saller()
        bres = baller()
        dres = daller()
        
        gres = get_ghosts(result, dres, bres)
        
        return jsonify({'sol': result, 'sol2':dres, 'sol3':bres, 'ghosts':gres, 'deda':facta, 'dedb':factb, 'dedd':factd}), 200
    except Exception as e:
        return jsonify({'sol': "lol"}), 500

if __name__ == '__main__':
    app.run(debug=True)