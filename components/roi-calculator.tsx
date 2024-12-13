'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, DollarSign, Clock, Users } from 'lucide-react';

interface CalculationResult {
  traditionalCost: number;
  aiCost: number;
  savings: number;
  savingsPercentage: number;
  hoursGained: number;
  setupFee: number;
  monthlyFee: number;
}

export default function ROICalculator() {
  const [activeTab, setActiveTab] = useState('receptionist');
  
  // Receptionist Calculator State
  const [receptionistInputs, setReceptionistInputs] = useState({
    hourlyRate: 20,
    hoursPerWeek: 40,
    overtimeHours: 0,
    benefitsCost: 800,
  });

  // Customer Service Team Calculator State
  const [teamInputs, setTeamInputs] = useState({
    teamSize: 3,
    averageHourlyRate: 18,
    hoursPerWeek: 40,
    overtimeHours: 5,
    benefitsCost: 800,
  });

  // Calculate costs for receptionist comparison
  const calculateReceptionistROI = (): CalculationResult => {
    // More accurate monthly hours calculation (52 weeks / 12 months = 4.333...)
    const monthlyHours = (receptionistInputs.hoursPerWeek * 52) / 12;
    const monthlyOvertimeHours = (receptionistInputs.overtimeHours * 52) / 12;
    const overtimeRate = receptionistInputs.hourlyRate * 1.5;
    
    // Calculate monthly salary
    const monthlySalary = (receptionistInputs.hourlyRate * monthlyHours) +
      (overtimeRate * monthlyOvertimeHours);
    
    // Calculate yearly costs (salary * 12 + yearly benefits)
    const yearlyTraditionalCost = (monthlySalary * 12) + (receptionistInputs.benefitsCost * 12);
    
    // AI Service cost breakdown
    const setupFee = 999;
    const monthlyFee = 800;
    const yearlyAICost = setupFee + (monthlyFee * 12);
    
    const savings = yearlyTraditionalCost - yearlyAICost;
    const savingsPercentage = (savings / yearlyTraditionalCost) * 100;
    
    // Calculate additional hours gained (24/7 coverage vs traditional hours)
    const traditionalHours = receptionistInputs.hoursPerWeek * 52;
    const aiHours = 24 * 7 * 52; // 24/7 coverage
    const hoursGained = aiHours - traditionalHours;

    return {
      traditionalCost: yearlyTraditionalCost,
      aiCost: yearlyAICost,
      savings,
      savingsPercentage,
      hoursGained,
      setupFee,
      monthlyFee,
    };
  };

  // Calculate costs for customer service team comparison
  const calculateTeamROI = (): CalculationResult => {
    // More accurate monthly hours calculation
    const monthlyHours = (teamInputs.hoursPerWeek * 52) / 12;
    const monthlyOvertimeHours = (teamInputs.overtimeHours * 52) / 12;
    const overtimeRate = teamInputs.averageHourlyRate * 1.5;
    
    // Calculate monthly salary per person
    const monthlySalaryPerPerson = (teamInputs.averageHourlyRate * monthlyHours) +
      (overtimeRate * monthlyOvertimeHours);
    
    // Calculate yearly costs (total salary * 12 + yearly benefits for team)
    const yearlyTraditionalCost = (monthlySalaryPerPerson * 12 * teamInputs.teamSize) + 
      (teamInputs.benefitsCost * 12 * teamInputs.teamSize);
    
    // AI Service cost breakdown for enterprise
    const setupFee = 999;
    const monthlyFee = 1500;
    const yearlyAICost = setupFee + (monthlyFee * 12);
    
    const savings = yearlyTraditionalCost - yearlyAICost;
    const savingsPercentage = (savings / yearlyTraditionalCost) * 100;
    
    // Calculate additional hours gained (24/7 coverage vs traditional hours)
    const traditionalHours = teamInputs.hoursPerWeek * 52 * teamInputs.teamSize;
    const aiHours = 24 * 7 * 52; // 24/7 coverage
    const hoursGained = aiHours - traditionalHours;

    return {
      traditionalCost: yearlyTraditionalCost,
      aiCost: yearlyAICost,
      savings,
      savingsPercentage,
      hoursGained,
      setupFee,
      monthlyFee,
    };
  };

  const result = activeTab === 'receptionist' ? calculateReceptionistROI() : calculateTeamROI();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Tabs defaultValue="receptionist" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="receptionist">Receptionist Comparison</TabsTrigger>
          <TabsTrigger value="team">Customer Service Team Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="receptionist">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Hourly Rate ($)</Label>
                  <Input
                    type="number"
                    value={receptionistInputs.hourlyRate}
                    onChange={(e) => setReceptionistInputs({
                      ...receptionistInputs,
                      hourlyRate: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Hours per Week</Label>
                  <Input
                    type="number"
                    value={receptionistInputs.hoursPerWeek}
                    onChange={(e) => setReceptionistInputs({
                      ...receptionistInputs,
                      hoursPerWeek: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Overtime Hours per Week</Label>
                  <Input
                    type="number"
                    value={receptionistInputs.overtimeHours}
                    onChange={(e) => setReceptionistInputs({
                      ...receptionistInputs,
                      overtimeHours: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Monthly Benefits Cost ($)</Label>
                  <Input
                    type="number"
                    value={receptionistInputs.benefitsCost}
                    onChange={(e) => setReceptionistInputs({
                      ...receptionistInputs,
                      benefitsCost: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Annual Cost Comparison</h3>
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-100 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Traditional Cost</span>
                      <span className="text-lg font-semibold">${result.traditionalCost.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      Includes salary, overtime, and benefits
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">AI Service Cost</span>
                      <span className="text-lg font-semibold">${result.aiCost.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      ${result.setupFee.toLocaleString()} setup fee + ${result.monthlyFee.toLocaleString()}/month
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-100 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Annual Savings</span>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          ${result.savings.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">
                          {result.savingsPercentage.toFixed(1)}% reduction
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-100 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Additional Coverage</span>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">
                          {result.hoursGained.toLocaleString()} hours/year
                        </div>
                        <div className="text-sm text-blue-600">
                          24/7 availability
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Team Size</Label>
                  <Input
                    type="number"
                    value={teamInputs.teamSize}
                    onChange={(e) => setTeamInputs({
                      ...teamInputs,
                      teamSize: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Average Hourly Rate ($)</Label>
                  <Input
                    type="number"
                    value={teamInputs.averageHourlyRate}
                    onChange={(e) => setTeamInputs({
                      ...teamInputs,
                      averageHourlyRate: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Hours per Week (per person)</Label>
                  <Input
                    type="number"
                    value={teamInputs.hoursPerWeek}
                    onChange={(e) => setTeamInputs({
                      ...teamInputs,
                      hoursPerWeek: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Overtime Hours per Week (per person)</Label>
                  <Input
                    type="number"
                    value={teamInputs.overtimeHours}
                    onChange={(e) => setTeamInputs({
                      ...teamInputs,
                      overtimeHours: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <Label>Monthly Benefits Cost (per person)</Label>
                  <Input
                    type="number"
                    value={teamInputs.benefitsCost}
                    onChange={(e) => setTeamInputs({
                      ...teamInputs,
                      benefitsCost: parseFloat(e.target.value) || 0
                    })}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Annual Cost Comparison</h3>
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-100 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Traditional Cost</span>
                      <span className="text-lg font-semibold">${result.traditionalCost.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      Includes salary, overtime, and benefits
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">AI Service Cost</span>
                      <span className="text-lg font-semibold">${result.aiCost.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-slate-600">
                      ${result.setupFee.toLocaleString()} setup fee + ${result.monthlyFee.toLocaleString()}/month
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-100 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Annual Savings</span>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-green-600">
                          ${result.savings.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600">
                          {result.savingsPercentage.toFixed(1)}% reduction
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-100 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Additional Coverage</span>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">
                          {result.hoursGained.toLocaleString()} hours/year
                        </div>
                        <div className="text-sm text-blue-600">
                          24/7 availability
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Limited Time Offer!
        </h3>
        <p className="text-yellow-700">
          Get started with our AI Customer Service solution for just $999 setup fee
          (regular price $2,000-$6,000). Don't miss out on this special offer!
        </p>
      </div>
    </div>
  );
}
