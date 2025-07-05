import { Box, Typography, Avatar, Stack, Divider } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const activities = [
  {
    title: "Your account is logged in",
    desc: "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.",
    user: "Miron Mahmud",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "45 min ago",
  },
  {
    title: "Current language has been changed",
    desc: "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.",
    user: "Bengali Language",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Flag_of_Bangladesh.svg",
    time: "24 hr ago",
  },
  {
    title: "Asked about this product",
    desc: "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.",
    user: null,
    avatar: null,
    time: "Yesterday",
  },
  {
    title: "Asked about this product",
    desc: "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem quam pede lobortis ligula, sit amet eleifend.",
    user: null,
    avatar: null,
    time: "Yesterday",
  },
];

const RecentActivities = () => {
  return (
    <Box sx={{ p: 3}} className ="recent-Box">
      <Stack spacing={3} sx={{ position: "relative", pl: 2, borderLeft: "2px dotted #ddd" }} className="timelineActivity">
        {activities.map((activity, index) => (
          <Box key={index} sx={{ position: "relative", pl: 3 }}>
            {/* Dot */}
            <FiberManualRecordIcon
              fontSize="small"
              sx={{
                color: "#444",
                position: "absolute",
                left: "-27px",
                top: "5px",
                bgcolor: "#fff",
              }}
              className="fiber"
            />

            {/* Title & time */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
              <Typography fontWeight="bold">{activity.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {activity.time}
              </Typography>
            </Box>

            {/* Description */}
            <Typography variant="body2" color="text.secondary">
              {activity.desc}
            </Typography>

            {/* Avatar or label */}
            {activity.avatar && (
              <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                <Avatar
                  src={activity.avatar}
                  alt={activity.user}
                  sx={{ width: 28, height: 28 }}
                />
                <Typography variant="body2" fontWeight="medium">
                  {activity.user}
                </Typography>
              </Stack>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentActivities;
