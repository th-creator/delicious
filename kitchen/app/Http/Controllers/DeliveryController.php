<?php

namespace App\Http\Controllers;

use App\Models\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{
    public function index()
    {
        $deliveries = Delivery::with('meals')->with('users')->get();
        return response()->json(["deliveries"=>$deliveries],200);
    }

    public function getOrders()
    {
        $deliveries = Delivery::with('meals')->where("user_id",auth("sanctum")->id())->get();
        return response()->json(["deliveries"=>$deliveries],200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'meals' => 'nullable|array',
            'place' => 'required',
            'date' => 'required',
            'total' => 'required',
            'quantity' => 'nullable|array',
        ]);
        $data['user_id'] = auth('sanctum')->id();
        $data['state'] = -1;
        
        $delivery = Delivery::create($data);
        foreach ($data['meals'] as $key => $value) {
            $delivery->meals()->attach($data['meals'][$key],["quantity"=>$data['quantity'][$key]]);
        }
        
        
        return response()->json(['message' => 'delivery created successfully', 'delivery' => $delivery], 201);
    }

    public function show(Delivery $delivery)
    {
        return $delivery->load('meals');
    }

    public function update(Request $request, Delivery $delivery)
    {
        $data = $request->validate([
            'meal' => 'required',
            'place' => 'required',
            'date' => 'required',
            'meals' => 'nullable|array',
        ]);

        $delivery->update($data);
        $delivery->meals()->sync($request->meals);

        return response()->json(['message' => 'Delivery updated successfully', 'delivery' => $delivery], 200);
    }

    public function destroy(Delivery $delivery)
    {
        $delivery->delete();
        return response()->json(['message' => 'Delivery deleted successfully'], 200);
    }
    public function DetachOrder(Request $request,$id)
    {
        $report = Delivery::where("id",$request->delivery_id)->get()->first();
        $report->meals()->detach($id);

        return response()->json(['message' => 'order deleted successfully']);
    }
}
