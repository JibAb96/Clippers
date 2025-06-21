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
		<section className="w-full px-0 md:px-6 xl:px-16 py-8 bg-gradient-to-br from-white via-slate-50 to-slate-100">
			<Card className="w-full max-w-7xl mx-auto shadow-2xl border-none bg-white/90 rounded-3xl">
				<CardHeader className="flex flex-col items-center gap-2 pb-2">
					<CardTitle className="text-2xl md:text-4xl font-bold text-secondary flex items-center gap-2">
						<Info className="w-7 h-7 text-sky-500" /> Submission Guidelines
					</CardTitle>
					<Badge className="text-xs md:text-base px-4 py-1 bg-sky-50 border-sky-200 text-sky-700 rounded-full">
						Please review before submitting your clip
					</Badge>
				</CardHeader>
				<CardContent className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 md:p-8">
					{guidelines.map((g, i) => (
						<Alert
							key={i}
							className="flex items-start gap-4 bg-white/80 border-slate-200 shadow-sm rounded-xl"
						>
							<CheckCircle2 className="text-green-500 w-6 h-6 mt-1 shrink-0" />
							<div>
								<AlertTitle className="font-semibold text-lg md:text-xl text-slate-800">
									{g.label}
								</AlertTitle>
								<AlertDescription className="text-slate-600 text-base md:text-lg">
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
