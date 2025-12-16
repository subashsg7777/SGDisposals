        package com.subash.sgdisposals.controller;

        import com.subash.sgdisposals.service.ICollectorService;
        import com.subash.sgdisposals.service.IUserService;
        import lombok.RequiredArgsConstructor;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.PutMapping;
        import org.springframework.web.bind.annotation.RequestMapping;
        import org.springframework.web.bind.annotation.RequestParam;
        import org.springframework.web.bind.annotation.RestController;

        import java.util.Map;

        @RestController
        @RequestMapping("api/v1/collector")
        @RequiredArgsConstructor
        public class CollectorController {

            private final ICollectorService collectorService;

            @PutMapping("collected")
            public ResponseEntity<Map<String,Object>> markAsCollected(@RequestParam Long id, @RequestParam Long user_id){

                Map<String,Object> map = collectorService.markAsCollected(id, user_id);
                return ResponseEntity.status(HttpStatus.OK).body(map);
            }
        }
