import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, Info } from "lucide-react";

const guidelines = [
	{
		label: "Video Length",
		value: "Maximum 90 seconds",
	},
	{
		label: "Video Format",
		value: "MP4",
	},
	{
		label: "Video Resolution",
		value: "Minimum 1080p",
	},
	{
		label: "Copyright",
		value: "All submissions must comply with copyright laws",
	},
	{
		label: "Community",
		value: "All submissions must comply with community guidelines",
	},
	{
		label: "Payment",
		value: "Submissions only posted after full payment confirmation",
	},
	{
		label: "Scheduling",
		value: "Clips will be posted at agreed scheduled date and time",
	},
];

const Guidlines = () => {
	return (
		<section className="w-full flex justify-center py-8 px-2 md:px-0">
			<Card className="w-full max-w-2xl shadow-xl border-none bg-gradient-to-br from-white via-slate-50 to-slate-100">
				<CardHeader className="flex flex-col items-center gap-2 pb-2">
					<CardTitle className="text-2xl md:text-3xl font-bold text-secondary flex items-center gap-2">
						<Info className="w-6 h-6 text-sky-500" /> Submission Guidelines
					</CardTitle>
					<Badge className="text-xs md:text-sm px-3 py-1 bg-sky-50 border-sky-200 text-sky-700 rounded-full">
						Please review before submitting your clip
					</Badge>
				</CardHeader>
				<CardContent className="flex flex-col gap-4 mt-2">
					{guidelines.map((g, i) => (
						<Alert
							key={i}
							className="flex items-center gap-3 bg-white/80 border-slate-200 shadow-sm"
						>
							<CheckCircle2 className="text-green-500 w-5 h-5 shrink-0" />
							<div>
								<AlertTitle className="font-semibold text-base md:text-lg text-slate-800">
									{g.label}
								</AlertTitle>
								<AlertDescription className="text-slate-600 text-sm md:text-base">
									{g.value}
								</AlertDescription>
							</div>
						</Alert>
					))}
				</CardContent>
			</Card>
		</section>
	);
};

export default Guidlines;
