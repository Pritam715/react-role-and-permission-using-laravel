<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use DB;
use Hash;
use Illuminate\Support\Arr;

class UserController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {   
        try{
            $user = User::where('email',$request->email)->first();
            if($user && Hash::check($request->password, $user->password)){
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                $token->save();
           
                $permissions = [];
                foreach($user->getAllPermissions() as $p){
                    array_push($permissions,$p->name);
                }
                return response([
                    'message'=>'Login Success !',
                    'token' => $tokenResult->accessToken,
                    'user'=> [
                        'name'=>$user->name,
                        'roles'=>$user->roles->pluck('name'),
                        'rights'=> $permissions
                    ]
                ]);
            }else{
                return response([
                    'message'=>'Credentials doesnot match !'
                ]);
            }
           
        }catch(\Exception $e){
            dd($e);
            return response([
                'message'=>'Login Failed'
            ]);
        }
        
    }





    public function index(){

        $users = User::with('roles')->get();
        return response([
            'message' => 'success',
            'users' => $users,
        ]);  
    }

    public function rolelist(){

        $roles = Role::get();
        return response([
            'message' => 'success',
            'roles' => $roles,
        ]);  
    }


    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function create()
    {
        $roles = Role::pluck('name','name')->all();
        return view('users.create',compact('roles'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $data = $request->data;
        $data['password'] = Hash::make($data['password']);
    
        $user = User::create($data);
        $user->assignRole($data['role']);
    
        return response([
            'message'=>"success"
        ]);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        return view('users.show',compact('user'));
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = User::find($id);
        $userRole = $user->roles->all();

        return response([
            'message'=>'success',
            'user'=>$user,
            'user_role'=>$userRole,
        ]);
    
        // return view('users.edit',compact('user','roles','userRole'));
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $this->validate($request, [
        //     'name' => 'required',
        //     'email' => 'required|email|unique:users,email,'.$id,
        //     'password' => 'same:confirm-password',
        //     'roles' => 'required'
        // ]);
    
        $input = $request->data;
        if(!empty($input['password'])){ 
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = Arr::except($input,array('password'));    
        }
    
        $user = User::find($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id',$id)->delete();
        
        if($input['role'])
        {
            $user->assignRole($input['role']);
        }
      
    
        return response([
            'message'=>'success'
        ]);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        User::find($id)->delete();
        return response([
            'message'=>'success',
        ]);
    }
}
